import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { BuildFactory } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'
import { ActionRule } from './ActionRule'

export class BuildFactoryRule extends ActionRule<BuildFactory> {
  isBuildInProgress = this.remind(Memory.IsBuildInProgress)
  nbProductsGiven = this.remind<number>(Memory.Count) ?? 0

  onRuleStart(): MaterialMove[] {
    this.memorize(Memory.Count, 0)
    if (this.action.price === 0) {
      return this.factories.moveItems({ type: LocationType.PlayerFactories, player: this.player, rotation: false }, 1)
    }
    if (this.getProducts().getQuantity() < (this.action.price ?? 0)) {
      return [this.startNextRule()]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.isBuildInProgress) {
      moves.push(...this.getProducts().moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id })))
    } else {
      if (this.factories.length > 0) {
        moves.push(...this.factories.moveItems({ type: LocationType.PlayerFactories, player: this.player }, 1))
      }
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Factory)(move) && move.location.type === LocationType.PlayerFactories) {
      this.memorize(Memory.IsBuildInProgress, true)
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isBuildInProgress) {
      this.memorize(Memory.Count, this.nbProductsGiven + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.remind(Memory.Count) === this.action.price) {
        this.memorize(Memory.Count, 0)
        return [this.startNextRule()]
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move) && move.location.type === LocationType.PlayerFactories) {
      if (this.action.price === 0) {
        return [this.startNextRule()]
      }
    }
    return moves
  }

  get factories() {
    return this.material(MaterialType.Factory).location(LocationType.FactoryDeck)
  }
}
