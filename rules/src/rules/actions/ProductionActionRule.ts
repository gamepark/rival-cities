import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'

export class ProductionActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  productChoosen = this.remind(MemoryType.ProductChoosen)
  productType?: Product

  constructor(game: MaterialGame, productType?: Product) {
    super(game)
    this.productType = productType
  }

  onRuleStart(): MaterialMove[] {
    return [...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }))]
  }

  getPlayerMoves(onNotProductChoosenMoves: MaterialMove[] = []): MaterialMove[] {
    if (!this.productChoosen) {
      return [...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })), ...onNotProductChoosenMoves]
    }
    if (this.playerFactories.length && this.productChoosen === this.productType) {
      return [...this.playerFactories.rotateItems(true), this.customMove(CustomMoveType.Pass)]
    }
    return [this.customMove(CustomMoveType.Pass)]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.id === this.productType) {
      if (!this.remind(MemoryType.BasicActionChoosen)) {
        this.memorize(MemoryType.BasicActionChoosen, ActionType.Production)
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.id === this.productType) {
      if (!this.productChoosen) {
        this.memorize(MemoryType.ProductChoosen, move.location.id)
        if (this.productType === Product.Beer) {
          return [...this.products.moveItems({ ...move.location, type: LocationType.PlayerProducts }, 1)]
        }
      }
      if (this.playerFactories.length === 0) {
        return [...this.nextRuleHelper.moveToNextRule()]
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move) && this.remind(MemoryType.ProductChoosen) === this.productType) {
      return [...this.products.moveItems({ type: LocationType.PlayerProducts, id: this.productChoosen, player: this.player }, 1)]
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.ProductChoosen)
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
}
