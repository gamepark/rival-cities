import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { GainLetterActionRule } from '../actions/GainLetterActionRule'
import { ProductionFurnitureActionRule } from '../actions/ProductionFurnitureActionRule'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class BasicActionCard5Rule extends PlayerTurnRule {
  productionActionRule = new ProductionFurnitureActionRule(this.game)
  gainLetterActionRule = new GainLetterActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  onRuleStart(): MaterialMove[] {
      this.computeActionIfPlayerHasGdanskAlliance()
      return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.productionActionRule.actionType)) {
      moves.push(...this.productionActionRule.getPlayerMoves())
    }
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.gainLetterActionRule.actionType)) {
      moves.push(...this.gainLetterActionRule.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.productionActionRule.beforeItemMove(move), ...this.gainLetterActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.productionActionRule.afterItemMove(move), ...this.gainLetterActionRule.afterItemMove(move)]
  }
      
  computeActionIfPlayerHasGdanskAlliance() {
    if(this.playerHasGdanskAlliance) {
      this.memorize(MemoryType.ComputedActions, [this.productionActionRule.actionType, this.gainLetterActionRule.actionType])
    }
  }

  get playerHasGdanskAlliance() {
    return new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceGdansk)
  }
}
