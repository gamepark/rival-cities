import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PlaySpecialActionCard } from '../material/Action'
import { SpecialActionCardHelper } from '../material/helper/SpecialActionCardHelper'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpecialAction } from '../material/SpecialAction'
import { ActionRule } from './actions/ActionRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'

export class PlaySpecialActionCardRule extends ActionRule<PlaySpecialActionCard> {
  getPlayerMoves() {
    const moves: MaterialMove[] = this.specialActionCards.moveItems({ type: LocationType.SpecialActionCardsDiscard })
    if (!this.remind(Memory.LetterSpentForOptionC)) {
      moves.push(this.customMove(CustomMoveType.Pass)) // Ship 18 => option C remains optional
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) {
      const specialAction = this.material(MaterialType.SpecialActionCard).getItem<SpecialAction>(move.itemIndex).id
      this.addActions(...new SpecialActionCardHelper(this.game).getCardActions(specialAction))
      return [this.startNextRule()]
    }
    return []
  }

  get specialActionCards() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.PlayerSpecialActionCardsHand).player(this.player)
  }
}
