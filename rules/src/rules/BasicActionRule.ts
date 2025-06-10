import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BasicActionCard, getBasicActionCardRule } from '../material/BasicActionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AbstractBasicActionCardRule } from './basicActions/AbstractBasicActionCardRule'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class BasicActionRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return this.basicActionCardRule.onRuleStart()
  }

  getPlayerMoves(): MaterialMove[] {
    return this.basicActionCardRule.getPlayerMoves()
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.basicActionCardRule.beforeItemMove(move, context)
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.basicActionCardRule.afterItemMove(move, context)
  }

  onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove[] {
    const moves = this.basicActionCardRule.onCustomMove(move, context)

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      moves.push(this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer))
    }

    return moves
  }

  onRuleEnd(): MaterialMove[] {
    return this.basicActionCardRule.onRuleEnd()
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

  get basicActionCardRule(): AbstractBasicActionCardRule {
    return getBasicActionCardRule(this.cardInInkjarPlace, this.game)
  }
}
