import { isCustomMoveType, isMoveItem, MaterialMove } from '@gamepark/rules-api'
import { isEqual, omit } from 'es-toolkit/compat'
import { Action, MultipleActions, SplitAction } from '../../material/Action'
import { CustomMoveType } from '../CustomMoveType'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { ActionRule } from './ActionRule'

export class PerformMultipleActionsRule extends ActionRule<MultipleActions | SplitAction> {
  getPlayerMoves(): MaterialMove[] {
    return this.action.actions
      .flatMap((action) => getActionRule(this.game, action).getPlayerMoves())
      .filter((move) => !isCustomMoveType(CustomMoveType.Pass)(move))
      .concat(this.customMove(CustomMoveType.Pass))
  }

  play(move: MaterialMove) {
    for (let index = 0; index < this.action.actions.length; index++) {
      const action = this.action.actions[index]
      const legalMoves = getActionRule(this.game, action).getPlayerMoves()
      const playedMove = isMoveItem(move) ? omit(move, 'reveal') : move
      if (legalMoves.some((legalMove) => isEqual(legalMove, playedMove))) {
        this.action.actions.splice(index, 1)
        this.startActionImmediately(action)
      }
    }
    return []
  }

  startActionImmediately(action: Action) {
    if (this.action.actions.length === 1) {
      this.actions[0] = this.action.actions[0]
    }
    this.actions.unshift(action)
    this.game.rule!.id = ActionRuleIds[action.type]
  }
}
