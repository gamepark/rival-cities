import { MaterialMove } from '@gamepark/rules-api'
import { isEqual } from 'es-toolkit/compat'
import { Alliance } from '../../material/Alliance'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { PerformMultipleActionsRule } from './PerformMultipleActionsRule'

export class ChooseSplitActionRule extends PerformMultipleActionsRule {
  play(move: MaterialMove) {
    if (this.hasAlliance(Alliance.Gdansk)) {
      super.play(move)
    } else {
      for (const action of this.action.actions) {
        const legalMoves = getActionRule(this.game, action).getPlayerMoves()
        if (legalMoves.some((legalMove) => isEqual(legalMove, move))) {
          this.actions[0] = action
          this.game.rule!.id = ActionRuleIds[action.type]
        }
      }
    }
    return []
  }
}
