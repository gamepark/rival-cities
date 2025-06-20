import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { ProductionBeerActionRule } from '../actions/ProductionBeerActionRule'
import { ProductionClothActionRule } from '../actions/ProductionClothActionRule'
import { AllianceCard } from '../../material/AllianceCard'
import { MemoryType } from '../MemoryType'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class BasicActionCard1Rule extends PlayerTurnRule {
  beerProductionActionRule = new ProductionBeerActionRule(this.game)
  clothProductionActionRule = new ProductionClothActionRule(this.game)
  allianceCardHelper = new AllianceCardHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.allianceCardHelper.computeActionIfPlayerHasGdanskAlliance([this.beerProductionActionRule.actionType, this.clothProductionActionRule.actionType])
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.beerProductionActionRule.actionType)) {
      moves.push(...this.beerProductionActionRule.getPlayerMoves())
    }
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.clothProductionActionRule.actionType)) {
      moves.push(...this.clothProductionActionRule.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.beerProductionActionRule.beforeItemMove(move), ...this.clothProductionActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.beerProductionActionRule.afterItemMove(move), ...this.clothProductionActionRule.afterItemMove(move)]
  }

  get playerHasGdanskAlliance() {
    return new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceGdansk)
  }
}
