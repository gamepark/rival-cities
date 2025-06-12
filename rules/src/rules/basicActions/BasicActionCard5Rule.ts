import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Product } from '../../material/Product'
import { GainLetterActionRule } from '../actions/GainLetterActionRule'
import { ProductionActionRule } from '../actions/ProductionActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard5Rule extends PlayerTurnRule {
  productionActionRule = new ProductionActionRule(this.game, Product.Furniture)
  gainLetterActionRule = new GainLetterActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  getPlayerMoves(): MaterialMove[] {
    if(!this.actionChoosen) {
      return this.productionActionRule.getPlayerMoves(this.gainLetterActionRule.getPlayerMoves())
    }
    if (this.actionChoosen === ActionType.Production) {
      return this.productionActionRule.getPlayerMoves()
    }
    if (this.actionChoosen === ActionType.GainLetter) {
      return this.gainLetterActionRule.getPlayerMoves()
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.productionActionRule.beforeItemMove(move), ...this.gainLetterActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.actionChoosen === ActionType.Production) {
      return this.productionActionRule.afterItemMove(move)
    }
    if (this.actionChoosen === ActionType.GainLetter) {
      return this.gainLetterActionRule.afterItemMove(move)
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    return this.productionActionRule.onRuleEnd()
  }
}
