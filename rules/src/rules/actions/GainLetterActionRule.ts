import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { GainLetterAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class GainLetterActionRule extends ActionRule<GainLetterAction> {
  onRuleStart(): MaterialMove[] {
    return this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, this.action.nbLettersToTake)
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    return [
      ...this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, this.action.nbLettersToTake),
      this.customMove(CustomMoveType.Pass, this.action)
    ]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize(MemoryType.BasicActionChosen, this.action.type)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      moves.push(...this.removeActionAndMove())
    }
    return moves
  }

  get letters() {
    return this.material(MaterialType.Letter).location(LocationType.LetterDeck)
  }
}
