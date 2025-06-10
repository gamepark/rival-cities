import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseFirstProductRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: number): MaterialMove[] {
    return [...this.availableProducts.moveItems((item) => ({type: LocationType.PlayerProducts, player, id: item.id}))]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(!isMoveItemType(MaterialType.Product)(move)) return []
    return [this.endPlayerTurn(move.location.player!)]
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.game.players[0])]
  }

  get availableProducts() {
    return this.material(MaterialType.Product).location(LocationType.ProductPiles)
  }
}
