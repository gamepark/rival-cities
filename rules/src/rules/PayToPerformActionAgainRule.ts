import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PayToPerformActionAgainAction } from '../material/Actions/Actions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActionRule } from './actions/ActionRule'
import { MemoryType } from './MemoryType'

export class PayToPerformActionAgainRule extends ActionRule<PayToPerformActionAgainAction> {
  getPlayerMoves(): MaterialMove[] {
    if (this.action?.productType) {
      return this.playerProducts.id(this.action.productType).moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id }))
    }
    return this.playerProducts.moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id }))
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      this.memorize<number>(MemoryType.Counter, (old) => old + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.remind(MemoryType.Counter) === this.action?.price) {
        this.memorize(MemoryType.Counter, 0)
        if (this.action?.actionToPerformAgain) {
          const actionToPerformAgain = this.action.actionToPerformAgain
          this.removeAction()
          return this.addActionBonusAndMove(actionToPerformAgain)
        }
      }
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }
}
