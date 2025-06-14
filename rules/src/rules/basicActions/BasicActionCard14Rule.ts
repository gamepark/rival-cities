import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { EarnPrestigeActionRule } from '../actions/EarnPrestigeActionRule'
import { ProductionBeerActionRule } from '../actions/ProductionBeerActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard14Rule extends PlayerTurnRule {
  productionActionRule = new ProductionBeerActionRule(this.game)
  earnPrestigeActionRule = new EarnPrestigeActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  getPlayerMoves(): MaterialMove[] {
    if(!this.actionChoosen) {
      return this.productionActionRule.getPlayerMoves(this.earnPrestigeActionRule.getPlayerMoves())
    }
    if (this.actionChoosen === ActionType.Production) {
      return this.productionActionRule.getPlayerMoves()
    }
    if (this.actionChoosen === ActionType.EarnPrestige) {
      return this.earnPrestigeActionRule.getPlayerMoves()
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.productionActionRule.beforeItemMove(move), ...this.earnPrestigeActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.actionChoosen === ActionType.Production) {
      return this.productionActionRule.afterItemMove(move)
    }
    if (this.actionChoosen === ActionType.EarnPrestige) {
      return this.earnPrestigeActionRule.afterItemMove(move)
    }
    return []
  }
}
