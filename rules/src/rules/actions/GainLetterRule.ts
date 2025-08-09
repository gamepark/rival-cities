import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { GainLetter } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class GainLetterRule extends ActionRule<GainLetter> {
  onRuleStart(): MaterialMove[] {
    return this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, this.action.nbLettersToTake)
  }

  getPlayerMoves(): MaterialMove[] {
    return [
      ...this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, this.action.nbLettersToTake),
      this.customMove(CustomMoveType.Pass)
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      moves.push(this.endAction())
    }
    return moves
  }

  get letters() {
    return this.material(MaterialType.Letter).location(LocationType.LetterDeck)
  }
}
