import { ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Product } from '../../material/Product'
import { ProductionHelper } from '../helper/ProductionHelper'
import { AbstractBasicActionCardRule } from './AbstractBasicActionCardRule'

export class BasicActionCard1Rule extends AbstractBasicActionCardRule {
  beerProductionHelper = new ProductionHelper(this.game, this.player, this.opponent, Product.Beer)
  clothProductionHelper = new ProductionHelper(this.game, this.player, this.opponent, Product.Cloth)

  getPlayerMoves(): MaterialMove[] {
    return [...this.beerProductionHelper.getPlayerMoves(), ...this.clothProductionHelper.getPlayerMoves()]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.beerProductionHelper.afterItemMove(move), ...this.clothProductionHelper.afterItemMove(move)]
  }

  onRuleEnd(): MaterialMove[] {
    return [...this.beerProductionHelper.onRuleEnd(), ...this.clothProductionHelper.onRuleEnd()]
  }
}
