import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ProductionHelper } from '../helper/ProductionHelper'
import { RuleId } from '../RuleId'
import { AbstractBasicActionCardRule } from './AbstractBasicActionCardRule'

export class BasicActionCard5Rule extends AbstractBasicActionCardRule {
  productionHelper = new ProductionHelper(this.game, this.player, this.opponent, Product.Furniture)

  getPlayerMoves(): MaterialMove[] {
    return this.productionHelper.getPlayerMoves(this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = this.productionHelper.afterItemMove(move)
    if(isMoveItemType(MaterialType.Letter)(move)) {
      moves.push(this.startPlayerTurn(RuleId.AdvanceInkJar, this.opponent))
    }
    return moves
  }

  onRuleEnd(): MaterialMove[] {
    return this.productionHelper.onRuleEnd()
  }

  get letters() {
    return this.material(MaterialType.Letter).location(LocationType.LetterDeck)
  }
}
