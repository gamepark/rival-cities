import { MaterialMove } from '@gamepark/rules-api'
import { isEqual } from 'lodash'
import { SplitAction } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { ActionRule } from './ActionRule'
import { PerformMultipleActionsRule } from './PerformMultipleActionsRule'

export class ChooseSplitActionRule extends ActionRule<SplitAction> {
  getPlayerMoves(): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).getPlayerMoves())
  }

  play(move: MaterialMove) {
    if (this.hasAlliance(Alliance.Gdansk)) {
      return new PerformMultipleActionsRule(this.game).play(move)
    }
    for (const action of this.action.actions) {
      const legalMoves = getActionRule(this.game, action).getPlayerMoves()
      if (legalMoves.some((legalMove) => isEqual(legalMove, move))) {
        this.actions[0] = action
        this.game.rule!.id = ActionRuleIds[action.type]
      }
    }
    return []
  }
}
