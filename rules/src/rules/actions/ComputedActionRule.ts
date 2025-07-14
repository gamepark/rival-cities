import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { ComputedAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { getActionRule } from '../helper/ActionHelper'
import { MemoryHelper } from '../helper/MemoryHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class ComputedActionRule extends ActionRule<ComputedAction> {
  actionRules = this.action?.actions?.map((it) => getActionRule(this.game, it)) ?? []
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    this.forget(MemoryType.ProductChoosen)
    const moves: MaterialMove[] = []
    this.action?.actions?.forEach((a) => {
      if (a.type === ActionType.OpponentEarnPrestige || a.type === ActionType.ReturnFactory) {
        moves.push(...getActionRule(this.game, a).onRuleStart(_move, _previousRule, _context))
      }
    })
    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.getPlayerMoves())]
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.beforeItemMove(move, context))]
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.afterItemMove(move, context))]
  }

  onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove[] {
    const actionsMoves = this.actionRules.flatMap((rule) => rule.onCustomMove(move, context))
    if(actionsMoves.length > 0) {
      return actionsMoves
    }
    return this.onPassMove(move)
  }

  onPassMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return this.removeActionAndMove()
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    new MemoryHelper(this.game).clearMemory()
    return []
  }
}
