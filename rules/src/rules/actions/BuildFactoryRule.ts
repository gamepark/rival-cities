import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { BuildFactory } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class BuildFactoryRule extends ActionRule<BuildFactory> {
  isBuildInProgress = this.remind(MemoryType.IsBuildInProgress)
  nbProductsGiven = this.remind<number>(MemoryType.Count) ?? 0

  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.Count, 0)
    if (this.action.price === 0) {
      return this.factories.moveItems({ type: LocationType.PlayerFactories, player: this.player }, 1)
    }
    if (this.playerProducts.getQuantity() < (this.action.price ?? 0)) {
      return [this.endAction()]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.isBuildInProgress) {
      moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id })))
    } else {
      if (this.factories.length > 0) {
        moves.push(...this.factories.moveItems({ type: LocationType.PlayerFactories, player: this.player }, 1))
      }
      moves.push(this.customMove(CustomMoveType.Pass, this.action))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Factory)(move) && move.location.type === LocationType.PlayerFactories) {
      this.memorize(MemoryType.IsBuildInProgress, true)
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isBuildInProgress) {
      this.memorize(MemoryType.Count, this.nbProductsGiven + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.remind(MemoryType.Count) === this.action.price) {
        this.memorize(MemoryType.Count, 0)
        return [this.endAction()]
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move) && move.location.type === LocationType.PlayerFactories) {
      if (this.action.price === 0) {
        return [this.endAction()]
      }
    }
    return moves
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get factories() {
    return this.material(MaterialType.Factory).location(LocationType.FactoryDeck)
  }
}
