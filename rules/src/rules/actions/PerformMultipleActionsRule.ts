import { MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { isEqual } from 'lodash'
import { Action, MultipleAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'
import { EarnPrestigeActionRule } from './EarnPrestigeActionRule'

export class PerformMultipleActionsRule extends ActionRule<MultipleAction> {
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    const firstAction = this.action.actions[0]
    if (firstAction.type === ActionType.EarnPrestige && firstAction.rival) {
      const action = this.action.actions.splice(1)[0]
      this.startActionImmediately(action)
      return new EarnPrestigeActionRule(this.game).onRuleStart()
    }
    // TODO: fix that:
    this.forget(MemoryType.ProductChosen)
    const moves: MaterialMove[] = []
    this.action.actions.forEach((a) => {
      if (a.type === ActionType.ReturnFactory || a.type === ActionType.DrawSpecialActionCard) {
        moves.push(...getActionRule(this.game, a).onRuleStart(_move, _previousRule, _context))
      }
    })
    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).getPlayerMoves())
  }

  play(move: MaterialMove) {
    for (let index = 0; index < this.action.actions.length; index++) {
      const action = this.action.actions[index]
      const legalMoves = getActionRule(this.game, action).getPlayerMoves()
      if (legalMoves.some((legalMove) => isEqual(legalMove, move))) {
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
