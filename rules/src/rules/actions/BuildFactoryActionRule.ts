import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { BuildFactoryAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class BuildFactoryActionRule extends ActionRule<BuildFactoryAction> {
  isBuildInProgress = this.remind(MemoryType.IsBuildInProgress)
  nbProductsGiven = this.remind(MemoryType.Counter) ?? 0

  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.Counter, 0)
    if(this.action?.price === 0) {
      return this.factories.moveItems({ type: LocationType.PlayerFactories, player: this.player }, 1)
    }
    if (this.playerProducts.getQuantity() < (this.action?.price ?? 0)) {
      return this.removeActionAndMove()
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
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
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Factory)(move) && move.location.type === LocationType.PlayerFactories) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
      this.memorize(MemoryType.IsBuildInProgress, true)
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isBuildInProgress) {
      this.memorize(MemoryType.Counter, this.nbProductsGiven + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (this.remind(MemoryType.BasicActionChoosen) !== this.action?.type) return moves
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.remind(MemoryType.Counter) === this.action?.price) {
        this.memorize(MemoryType.Counter, 0)
        return this.removeActionAndMove()
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move) && move.location.type === LocationType.PlayerFactories) {
      if (this.action?.price === 0) {
        return this.removeActionAndMove()
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move) && this.isSameAction(move.data)) {
      return this.removeActionAndMove()
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get factories() {
    return this.material(MaterialType.Factory).location(LocationType.FactoryDeck)
  }
}
