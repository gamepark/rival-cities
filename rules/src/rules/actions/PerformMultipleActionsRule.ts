import { CustomMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { isEqual } from 'lodash'
import { MultipleAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryHelper } from '../helper/MemoryHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class PerformMultipleActionsRule extends ActionRule<MultipleAction> {
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    this.forget(MemoryType.ProductChosen)
    const moves: MaterialMove[] = []
    this.action.actions.forEach((a) => {
      if (a.type === ActionType.OpponentEarnPrestige || a.type === ActionType.ReturnFactory || a.type === ActionType.DrawSpecialActionCard) {
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
        if (this.action.actions.length === 1) {
          this.actions[0] = this.action.actions[0]
        }
        this.actions.unshift(action)
        this.game.rule!.id = ActionRuleIds[action.type]
      }
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.endAction()]
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    new MemoryHelper(this.game).clearMemory()
    return []
  }
}
