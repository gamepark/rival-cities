import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Product } from '../../material/Product'
import { ProductionActionRule } from '../actions/ProductionActionRule'

export class BasicActionCard1Rule extends PlayerTurnRule {
  beerProductionActionRule = new ProductionActionRule(this.game, Product.Beer)
  clothProductionActionRule = new ProductionActionRule(this.game, Product.Cloth)

  getPlayerMoves(): MaterialMove[] {
    return [...this.beerProductionActionRule.getPlayerMoves(), ...this.clothProductionActionRule.getPlayerMoves()]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.beerProductionActionRule.afterItemMove(move), ...this.clothProductionActionRule.afterItemMove(move)]
  }

  onRuleEnd(): MaterialMove[] {
    return [...this.beerProductionActionRule.onRuleEnd(), ...this.clothProductionActionRule.onRuleEnd()]
  }
}
