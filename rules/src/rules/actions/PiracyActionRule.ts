import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PiracyAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class PiracyActionRule extends ActionRule<PiracyAction> {

  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (this.opponentProducts.length > 0) {
      moves.push(...this.opponentProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.Product)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
      this.memorize<number>(MemoryType.Counter, (old) => old + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.Product)(move) && this.remind(MemoryType.Counter) === this.action?.nbProductsToSteal) {
      this.memorize(MemoryType.Counter, 0)
      return this.removeActionAndMove()
    }
    return []
  }

  get opponentProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer)
  }
}
