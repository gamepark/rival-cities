import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { BasicActionHelper } from '../helper/BasicActionHelper'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class GiftActionRule extends PlayerTurnRule {
  actionType = ActionType.Gift
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  allianceCardHelper = new AllianceCardHelper(this.game)
  nbProductToTake = 1
  productType?: Product
  productChoosen = this.remind(MemoryType.ProductChoosen)
  nbProductGiven = this.remind<number>(MemoryType.NbProductGiven)

  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) {
      return moves
    }
    if(this.productType) {
      for (let i = 0; i < this.nbProductToTake; i++) {
        moves.push(this.products.moveItem({ type: LocationType.PlayerProducts, player: this.player, id: this.productType }))
      }
    }
    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) {
      return moves
    }
    moves.push(...this.allProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })))
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) {
      return []
    }
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      if (!this.productChoosen) {
        this.memorize(MemoryType.ProductChoosen, move.location.id)
      }
      this.memorize(MemoryType.BasicActionChoosen, ActionType.Gift)
      this.memorize(MemoryType.NbProductGiven, this.nbProductGiven + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) {
      return []
    }
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      if (this.remind(MemoryType.NbProductGiven) === this.nbProductToTake) {
        this.forget(MemoryType.ProductChoosen)
        this.forget(MemoryType.BasicActionChoosen)
        this.memorize(MemoryType.NbProductGiven, 0)
        moves.push(...this.allianceCardHelper.getOsloProducts(move.location.id as Product))
        moves.push(...this.allianceCardHelper.getNovgorodProducts(move.location.id as Product))
        moves.push(...this.allianceCardHelper.getLondonProducts(move.location.id as Product))
        moves.push(...this.computedActionHelper.removeActionAndWait(this.actionType))
      }
    }
    return moves
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
