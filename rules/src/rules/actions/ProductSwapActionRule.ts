import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { ProductSwapAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class ProductSwapActionRule extends ActionRule<ProductSwapAction> {
  nbSwaps: number = this.remind(MemoryType.Count) ?? 0
  isProductReturn = this.remind(MemoryType.IsProductReturn)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.isProductReturn) {
      moves.push(...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1))
    } else if (this.nbSwaps < this.nbPossibleSwaps) {
      moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), 1))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (move.location.type === LocationType.ProductPiles) {
        this.memorize(MemoryType.IsProductReturn, true)
      } else if (move.location.type === LocationType.PlayerProducts) {
        this.memorize(MemoryType.IsProductReturn, false)
        this.memorize(MemoryType.Count, this.nbSwaps + 1)
        if (this.remind(MemoryType.Count) === this.action.nbPossibleSwaps) {
          this.memorize(MemoryType.Count, 0)
          return [this.endAction()]
        }
      }
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get products() {
    return this.material(MaterialType.Product).location(LocationType.ProductPiles)
  }

  get nbPossibleSwaps() {
    return this.action.nbPossibleSwaps ?? 0
  }
}
