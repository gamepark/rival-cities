import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { BasicActionHelper } from '../helper/BasicActionHelper'

export class ProductSwapActionRule extends PlayerTurnRule {
  actionType = ActionType.ProductSwap
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  nbSwaps: number = this.remind(MemoryType.NbSwaps) ?? 0
  isProductReturn = this.remind(MemoryType.IsProductReturn)

  getPlayerMoves(): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (this.isProductReturn) {
      moves.push(...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1))
    } else if (this.nbSwaps < 2) {
      moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), 1))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.actionType))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.ProductSwap)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (move.location.type === LocationType.ProductPiles) {
        this.memorize(MemoryType.IsProductReturn, true)
      } else if (move.location.type === LocationType.PlayerProducts) {
        this.memorize(MemoryType.IsProductReturn, false)
        this.memorize(MemoryType.NbSwaps, this.nbSwaps + 1)
        if (this.remind(MemoryType.NbSwaps) === 2) {
          return this.computedActionHelper.removeActionAndnext(this.actionType)
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
}
