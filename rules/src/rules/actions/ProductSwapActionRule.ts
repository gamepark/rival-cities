import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'

export class ProductSwapActionRule extends PlayerTurnRule {
  nbSwaps = this.remind(MemoryType.NbSwaps) ?? 0
  isProductReturn = this.remind(MemoryType.IsProductReturn)

  getPlayerMoves(): MaterialMove[] {
    if(this.isProductReturn) {
      return [...this.products.moveItems(item => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1)]
    }
    if(this.nbSwaps < 2) {
      return [...this.playerProducts.moveItems(item => ({ type: LocationType.ProductPiles, id: item.id }), 1)]
    }
    return [this.customMove(CustomMoveType.Pass)]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.ProductSwap)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move)) {
      if(move.location.type === LocationType.ProductPiles) {
        this.memorize(MemoryType.IsProductReturn, true)
      } else if(move.location.type === LocationType.PlayerProducts) {
        this.memorize(MemoryType.IsProductReturn, false)
        this.memorize(MemoryType.NbSwaps, this.nbSwaps + 1)
      }
    }
    return moves
  }

  onRuleEnd(): MaterialMove[] {
    this.memorize(MemoryType.NbSwaps, 0)
    this.memorize(MemoryType.IsProductReturn, false)
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get products() {
    return this.material(MaterialType.Product).location(LocationType.ProductPiles)
  }
}
