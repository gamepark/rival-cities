import { MaterialMove } from '@gamepark/rules-api'
import { isEqual } from 'lodash'
import { ChoiceAction } from '../../material/Actions/Actions'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class ChooseSplitActionRule extends ActionRule<ChoiceAction> {
  onRuleStart(): MaterialMove[] {
    this.forget(MemoryType.ProductChosen)
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).getPlayerMoves())
  }

  play(move: MaterialMove) {
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
