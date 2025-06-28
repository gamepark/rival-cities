import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { ProductSwapAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class ProductSwapActionRule extends ActionRule<ProductSwapAction> {
  nbSwaps: number = this.remind(MemoryType.Counter) ?? 0
  isProductReturn = this.remind(MemoryType.IsProductReturn)

  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (this.isProductReturn) {
      moves.push(...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1))
    } else if (this.nbSwaps < this.nbPossibleSwaps) {
      moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), 1))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action?.type))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (move.location.type === LocationType.ProductPiles) {
        this.memorize(MemoryType.IsProductReturn, true)
      } else if (move.location.type === LocationType.PlayerProducts) {
        this.forget(MemoryType.BasicActionChoosen)
        this.memorize(MemoryType.IsProductReturn, false)
        this.memorize(MemoryType.Counter, this.nbSwaps + 1)
        if (this.remind(MemoryType.Counter) === this.action?.nbPossibleSwaps) {
          this.memorize(MemoryType.Counter, 0)
          return this.next()
        }
      }
    }
    return []
  }

  next() {
    return this.removeActionAndMove()
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get products() {
    return this.material(MaterialType.Product).location(LocationType.ProductPiles)
  }

  get nbPossibleSwaps() {
    return this.action?.nbPossibleSwaps ?? 0
  }
}
