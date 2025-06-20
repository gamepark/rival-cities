import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ActionType } from './ActionType'
import { CustomMoveType } from './CustomMoveType'
import { ComputedActionsHelper } from './helper/ComputedActionsHelper'
import { Product } from '../material/Product'
import { MemoryType } from './MemoryType'

export class AllianceCardDrawSpecialActionCardAgainRule extends PlayerTurnRule {
  actionType = ActionType.DrawSpecialActionCard
  computedActionHelper = new ComputedActionsHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []

    moves.push(...this.playerBeers.moveItems((it) => ({ type: LocationType.ProductPiles, id: it.location.id })))

    moves.push(this.customMove(CustomMoveType.Pass, true))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      this.forget(MemoryType.BasicActionChoosen)
      moves.push(this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player }))
      moves.push(...this.computedActionHelper.removeActionAndWait(this.actionType))
    }
    return moves
  }

  get playerBeers() {
    return this.material(MaterialType.Product).id(Product.Beer).location(LocationType.PlayerProducts).player(this.player)
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.SpecialActionCardsDeck)
      .maxBy((it) => it.location.x!)
  }
}
