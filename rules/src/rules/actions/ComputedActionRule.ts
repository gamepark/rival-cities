import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { ComputedAction } from '../../material/Actions/Actions'
import { CustomMoveType } from '../CustomMoveType'
import { getActionRule } from '../helper/ActionHelper'
import { ActionRule } from './ActionRule'
import { MemoryHelper } from '../helper/MemoryHelper'

export class ComputedActionRule extends ActionRule<ComputedAction> {
  actionRules = this.action?.actions.map((it) => getActionRule(this.game, it)) ?? []
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    return [...this.actionRules.flatMap((rule) => rule.onRuleStart(_move, _previousRule, _context))]
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
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return this.removeActionAndMove()
    }
    return [...this.actionRules.flatMap((rule) => rule.onCustomMove(move, context))]
  }

  onRuleEnd(): MaterialMove[] {
    new MemoryHelper(this.game).clearMemory()
    return []
  }
}
