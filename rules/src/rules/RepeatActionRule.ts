import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { RepeatAction } from '../material/Action'
import { CostType } from '../material/Cost'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Product } from '../material/Product'
import { ActionRule } from './actions/ActionRule'
import { CustomMoveType } from './CustomMoveType'
import { getActionRule } from './helper/ActionHelper'

export class RepeatActionRule extends ActionRule<RepeatAction> {
  onRuleStart() {
    const moves = this.getPlayerMoves()
    return moves.length === 1 ? moves : []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.Pass)]
    const cost = this.action.cost
    if (cost.type === CostType.Product) {
      const product = this.getProduct(cost.product)
      if (product.getQuantity() >= cost.amount) {
        moves.push(product.moveItem({ type: LocationType.ProductSupply, id: cost.product }, cost.amount))
      }
    } else {
      const productsICanSpend = this.getProducts().id<Product>((product) => this.willHaveEnoughAfterSpending(product))
      moves.push(...productsICanSpend.moveItems((item) => ({ type: LocationType.ProductSupply, id: item.id })))
    }
    return moves
  }

  willHaveEnoughAfterSpending(product: Product) {
    return getActionRule(this.game, this.action.extraAction).canAffordAfterSpending(product)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductSupply) {
      this.addActions(this.action.extraAction)
      return [this.startNextRule()]
    }
    return []
  }
}
