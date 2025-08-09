import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PayToPerformActionAgainAction } from '../material/Action'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActionRule } from './actions/ActionRule'
import { CustomMoveType } from './CustomMoveType'
import { MemoryType } from './MemoryType'

export class PayToPerformActionAgainRule extends ActionRule<PayToPerformActionAgainAction> {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.action.productType) {
      moves.push(...this.playerProducts.id(this.action.productType).moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id })))
    } else {
      moves.push(...this.playerProducts.moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id })))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      this.memorize<number>(MemoryType.Count, (old) => old + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.remind(MemoryType.Count) === this.action.price) {
        this.memorize(MemoryType.Count, 0)
        if (this.action.actionToPerformAgain) {
          const actionToPerformAgain = this.action.actionToPerformAgain
          this.addActionBonus(actionToPerformAgain)
          return [this.endAction()]
        }
      }
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }
}
