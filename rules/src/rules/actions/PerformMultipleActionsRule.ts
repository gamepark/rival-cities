import { isMoveItem, MaterialMove } from '@gamepark/rules-api'
import { isEqual, omit } from 'lodash'
import { Action, MultipleAction } from '../../material/Actions/Actions'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class PerformMultipleActionsRule extends ActionRule<MultipleAction> {
  onRuleStart() {
    // TODO: fix that:
    this.forget(MemoryType.ProductChosen)
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).getPlayerMoves())
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
