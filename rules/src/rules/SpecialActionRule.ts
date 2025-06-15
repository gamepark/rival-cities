import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { actionRules, ActionType } from './ActionType'
import { CustomMoveType } from './CustomMoveType'
import { MemoryType } from './MemoryType'

export class SpecialActionRule extends PlayerTurnRule {
  actionRules = this.remind<ActionType[]>(MemoryType.ComputedActions).map((it) => actionRules[it](this.game))
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.onRuleStart(_move, _previousRule, _context))]
  }

  getPlayerMoves(): MaterialMove[] {
    return [
      ...this.actionRules.flatMap((rule) => rule.getPlayerMoves()),
      this.customMove(CustomMoveType.Pass)
    ]
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.beforeItemMove(move, context))]
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.afterItemMove(move, context))]
  }

  onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.onCustomMove(move, context))]
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.BasicActionChoosen)
    return []
  }
}
