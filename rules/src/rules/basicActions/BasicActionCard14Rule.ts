import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { EarnPrestigeActionRule } from '../actions/EarnPrestigeActionRule'
import { ProductionBeerActionRule } from '../actions/ProductionBeerActionRule'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class BasicActionCard14Rule extends PlayerTurnRule {
  productionActionRule = new ProductionBeerActionRule(this.game)
  earnPrestigeActionRule = new EarnPrestigeActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)
  allianceCardHelper = new AllianceCardHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.allianceCardHelper.computeActionIfPlayerHasGdanskAlliance([this.productionActionRule.actionType, this.earnPrestigeActionRule.actionType])
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.productionActionRule.actionType)) {
      moves.push(...this.productionActionRule.getPlayerMoves())
    }
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.earnPrestigeActionRule.actionType)) {
      moves.push(...this.earnPrestigeActionRule.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.productionActionRule.beforeItemMove(move), ...this.earnPrestigeActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.productionActionRule.afterItemMove(move), ...this.earnPrestigeActionRule.afterItemMove(move)]
  }

  get playerHasGdanskAlliance() {
    return new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceGdansk)
  }
}
