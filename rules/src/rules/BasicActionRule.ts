import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'
import { MemoryHelper } from './helper/MemoryHelper'
import { actionRules, ActionType } from './ActionType'
import { AllianceCardHelper } from '../material/helper/AllianceCardHelper'

export class BasicActionRule extends PlayerTurnRule {
  allianceCardHelper = new AllianceCardHelper(this.game)
  actionRules = this.remind<ActionType[]>(MemoryType.ComputedActions).map((it) => actionRules[it](this.game))
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    this.memorize(MemoryType.PreviousRule, RuleId.BasicAction)
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
    return [...this.actionRules.flatMap((rule) => rule.onCustomMove(move, context))]
  }

  onRuleEnd(): MaterialMove[] {
    new MemoryHelper(this.game).clearMemory()
    return []
  }
}
