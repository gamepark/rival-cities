import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { BasicActionHelper } from '../helper/BasicActionHelper'

export class PiracyActionRule extends PlayerTurnRule {
  actionType = ActionType.Piracy
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  nbProductsToSteal = 1

  onRuleStart(): MaterialMove[] {
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (this.opponentProducts.length > 0) {
      moves.push(...this.opponentProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.Product)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, this.actionType)
      this.memorize<number>(MemoryType.NbProductStealed, (old) => old + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.Product)(move) && this.remind(MemoryType.NbProductStealed) === this.nbProductsToSteal) {
      this.forget(MemoryType.BasicActionChoosen)
      return this.computedActionHelper.removeActionAndWait(this.actionType)
    }
    return []
  }

  get opponentProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer)
  }
}
