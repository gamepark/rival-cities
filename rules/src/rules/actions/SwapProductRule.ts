import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { SwapProduct } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class SwapProductRule extends ActionRule<SwapProduct> {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    if (this.action.swap) {
      moves.push(...this.productsSupply.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1))
    } else {
      if (this.productsSupply.getQuantity() > 0) {
        moves.push(...this.getProducts().moveItems((item) => ({ type: LocationType.ProductSupply, id: item.id }), 1))
      }
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (move.location.type === LocationType.ProductSupply) {
        this.action.swap = true
      } else if (move.location.type === LocationType.PlayerProducts) {
        this.action.swap = false
        this.action.times--
        if (!this.action.times) {
          return [this.startNextRule()]
        }
      }
    }
    return []
  }

  get productsSupply() {
    return this.material(MaterialType.Product).location(LocationType.ProductSupply)
  }
}
