import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseStartProductRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.material(MaterialType.Product)
      .location(LocationType.ProductPiles)
      .moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (this.player === this.game.players[0]) {
        return [this.startPlayerTurn(RuleId.ChooseStartProduct, this.game.players[1])]
      } else {
        return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.game.players[0])]
      }
    }
    return []
  }
}
