import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'

export class GainLetterActionRule extends PlayerTurnRule {
  actionType = ActionType.GainLetter
  computedActionHelper = new ComputedActionsHelper(this.game)
  nbLettersToTake = 1

  onRuleStart(): MaterialMove[] {
    return this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, this.nbLettersToTake)
  }
  getPlayerMoves(): MaterialMove[] {
    return this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, this.nbLettersToTake)
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.GainLetter)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      moves.push(...this.computedActionHelper.removeActionAndWait(this.actionType))
    }
    return moves
  }

  get letters() {
    return this.material(MaterialType.Letter).location(LocationType.LetterDeck)
  }
}
