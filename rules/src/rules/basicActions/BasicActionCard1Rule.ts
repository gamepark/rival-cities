import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { ProductionBeerActionRule } from '../actions/ProductionBeerActionRule'
import { ProductionClothActionRule } from '../actions/ProductionClothActionRule'

export class BasicActionCard1Rule extends PlayerTurnRule {
  beerProductionActionRule = new ProductionBeerActionRule(this.game)
  clothProductionActionRule = new ProductionClothActionRule(this.game)

  getPlayerMoves(): MaterialMove[] {
    return this.beerProductionActionRule.getPlayerMoves(this.clothProductionActionRule.getPlayerMoves())
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.beerProductionActionRule.afterItemMove(move), ...this.clothProductionActionRule.afterItemMove(move)]
  }
}
