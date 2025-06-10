import { ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Product } from '../../material/Product'
import { ProductionHelper } from '../helper/ProductionHelper'
import { AbstractBasicActionCardRule } from './AbstractBasicActionCardRule'

export class BasicActionCard7Rule extends AbstractBasicActionCardRule {
  productionHelper = new ProductionHelper(this.game, this.player, this.opponent, Product.Cloth)

  getPlayerMoves(): MaterialMove[] {
    return this.productionHelper.getPlayerMoves()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return this.productionHelper.afterItemMove(move)
  }

  onRuleEnd(): MaterialMove[] {
    return this.productionHelper.onRuleEnd()
  }
}
