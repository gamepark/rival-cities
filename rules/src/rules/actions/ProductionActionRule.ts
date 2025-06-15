import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'

export class ProductionActionRule extends PlayerTurnRule {
  actionType = ActionType.Production
  computedActionHelper = new ComputedActionsHelper(this.game)
  productChoosen = this.remind(MemoryType.ProductChoosen)
  productType?: Product

  onRuleStart(): MaterialMove[] {
    return [...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }))]
  }

  getPlayerMoves(onNotProductChoosenMoves: MaterialMove[] = []): MaterialMove[] {
    if (!this.productChoosen) {
      const productsToMove = this.productType ? this.products : this.allProducts
      return [...productsToMove.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })), ...onNotProductChoosenMoves]
    }
    if (this.playerFactories.length) {
      return [...this.playerFactories.rotateItems(true), this.customMove(CustomMoveType.Pass)]
    }
    return [this.customMove(CustomMoveType.Pass)]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (!this.remind(MemoryType.BasicActionChoosen)) {
        this.memorize(MemoryType.BasicActionChoosen, ActionType.Production)
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (!this.productChoosen) {
        this.memorize(MemoryType.ProductChoosen, move.location.id)
        if (this.productType === Product.Beer && move.location.id === Product.Beer) {
          return [...this.products.moveItems({ ...move.location, type: LocationType.PlayerProducts }, 1)]
        }
      }
      if (this.playerFactories.length === 0) {
        this.forget(MemoryType.ProductChoosen)
        return [...this.computedActionHelper.removeActionAndWait(this.actionType)]
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move)) {
      if(!this.productType) {
        this.forget(MemoryType.ProductChoosen)
        return []
      }
      if(this.productChoosen === this.productType) {
        return [...this.products.moveItems({ type: LocationType.PlayerProducts, id: this.productChoosen, player: this.player }, 1)]
      }
    }
    return []
  }

  get playerFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(undefined)
  }

  get products() {
    const resourcesInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles).id(this.productType)

    if (resourcesInReserve.length > 0) return resourcesInReserve

    const opponentResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer).id(this.productType)
    const playerResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(this.productType)

    if (opponentResource.length > playerResource.length) return opponentResource

    return resourcesInReserve
  }

  get allProducts() {
    const resourcesInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles)

    if (resourcesInReserve.length > 0) return resourcesInReserve

    const opponentResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer)
    const playerResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)

    if (opponentResource.length > playerResource.length) return opponentResource

    return resourcesInReserve
  }
}
