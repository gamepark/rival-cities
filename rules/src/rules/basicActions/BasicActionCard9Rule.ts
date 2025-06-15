import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { ProductionLeatherActionRule } from '../actions/ProductionLeatherActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard9Rule extends PlayerTurnRule {
  productionActionRule = new ProductionLeatherActionRule(this.game)
  advanceLawsuitActionRule = new AdvanceLawsuitActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)
  getPlayerMoves(): MaterialMove[] {
    if (!this.actionChoosen) {
      return this.productionActionRule.getPlayerMoves(this.advanceLawsuitActionRule.getPlayerMoves())
    }
    if (this.actionChoosen === ActionType.Production) {
      return this.productionActionRule.getPlayerMoves()
    }
    if (this.actionChoosen === ActionType.AdvanceLawsuit) {
      return this.advanceLawsuitActionRule.getPlayerMoves()
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.productionActionRule.beforeItemMove(move), ...this.advanceLawsuitActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.actionChoosen === ActionType.Production) {
      return this.productionActionRule.afterItemMove(move)
    }
    if (this.actionChoosen === ActionType.AdvanceLawsuit) {
      return this.advanceLawsuitActionRule.afterItemMove(move)
    }
    return []
  }
}
