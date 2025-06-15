import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BasicActionCard, getBasicActionCardRule } from '../material/BasicActionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasicActionCard0Rule } from './basicActions/BasicActionCard0Rule'
import { CustomMoveType } from './CustomMoveType'
import { MemoryType } from './MemoryType'

export class BasicActionRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    return this.basicActionCardRule.onRuleStart(_move, _previousRule, _context)
  }

  getPlayerMoves(): MaterialMove[] {
    return [...this.basicActionCardRule.getPlayerMoves(), this.customMove(CustomMoveType.Pass)]
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.basicActionCardRule.beforeItemMove(move, context)
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.basicActionCardRule.afterItemMove(move, context)
  }

  onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove[] {
    const moves = super.onCustomMove(move, context)

    moves.push(...this.basicActionCardRule.onCustomMove(move, context))

    return moves
  }

  onRuleEnd(_move: RuleMove, _context?: PlayMoveContext): MaterialMove[] {
    this.forget(MemoryType.BasicActionChoosen)
    return this.basicActionCardRule.onRuleEnd(_move, _context)
  }

  get inkjarLocationId(): number {
    return this.material(MaterialType.InkJar).location(LocationType.InkJarPiste).getItem()?.location.id
  }

  get cardInInkjarPlace(): BasicActionCard {
    return this.material(MaterialType.BasicActionCard)
      .location(LocationType.CardPiste)
      .filter((it) => it.location.id === this.inkjarLocationId)
      .getItem()?.id
  }

  get basicActionCardRule(): PlayerTurnRule {
    return this.inkjarLocationId === 0 ? new BasicActionCard0Rule(this.game) : getBasicActionCardRule(this.cardInInkjarPlace, this.game)
  }
}
