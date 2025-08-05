import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PayToPerformActionAgainAction } from '../material/Actions/Actions'
import { ActionType } from '../material/Actions/ActionType'
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
    if (this.playerProducts.length && this.playerLetters.length) {
      moves.push(this.customMove(CustomMoveType.TakeLetterToSwapProduct))
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
          this.removeAction()
          return this.addActionBonusAndMove(actionToPerformAgain)
        }
      }
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return this.removeActionAndMove()
    }
    if (isCustomMoveType(CustomMoveType.TakeLetterToSwapProduct)(move)) {
      return [
        this.playerLetters.moveItem({ type: LocationType.LetterDeck }),
        ...this.addActionBonusAndMove({ type: ActionType.ProductSwap, nbPossibleSwaps: 1 })
      ]
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }
}
