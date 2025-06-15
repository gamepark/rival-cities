import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'

export class PiracyActionRule extends PlayerTurnRule {
  actionType = ActionType.Piracy
  computedActionHelper = new ComputedActionsHelper(this.game)
  nbProductsToSteal = 1

  onRuleStart(): MaterialMove[] {
    if(this.opponentProducts.length === 0) {
      return this.computedActionHelper.removeActionAndWait(this.actionType)
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(this.opponentProducts.length > 0) {
      moves.push(...this.opponentProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItemType(MaterialType.Product)(move)) {
      this.memorize<number>(MemoryType.NbProductStealed, (old) => old + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && this.remind(MemoryType.NbProductStealed) === this.nbProductsToSteal) {
      this.memorize(MemoryType.NbProductStealed, 0)
      return this.computedActionHelper.removeActionAndWait(this.actionType)
    }
    return []
  }

  get opponentProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer)
  }
}
