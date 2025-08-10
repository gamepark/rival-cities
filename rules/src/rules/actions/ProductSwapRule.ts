import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { ProductSwap } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'
import { ActionRule } from './ActionRule'

export class ProductSwapRule extends ActionRule<ProductSwap> {
  nbSwaps: number = this.remind(Memory.Count) ?? 0
  isProductReturn = this.remind(Memory.IsProductReturn)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.isProductReturn) {
      moves.push(...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1))
    } else if (this.nbSwaps < this.nbPossibleSwaps) {
      moves.push(...this.getProducts().moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), 1))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (move.location.type === LocationType.ProductPiles) {
        this.memorize(Memory.IsProductReturn, true)
      } else if (move.location.type === LocationType.PlayerProducts) {
        this.memorize(Memory.IsProductReturn, false)
        this.memorize(Memory.Count, this.nbSwaps + 1)
        if (this.remind(Memory.Count) === this.action.nbPossibleSwaps) {
          this.memorize(Memory.Count, 0)
          return [this.endAction()]
        }
      }
    }
    return []
  }

  get products() {
    return this.material(MaterialType.Product).location(LocationType.ProductPiles)
  }

  get nbPossibleSwaps() {
    return this.action.nbPossibleSwaps ?? 0
  }
}
