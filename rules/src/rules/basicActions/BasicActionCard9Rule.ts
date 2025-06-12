import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Product } from '../../material/Product'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { ProductionActionRule } from '../actions/ProductionActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard9Rule extends PlayerTurnRule {
  productionActionRule = new ProductionActionRule(this.game, Product.Leather)
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

  onRuleEnd(): MaterialMove[] {
    return this.productionActionRule.onRuleEnd()
  }
}
