import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { GainLetter } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class GainLetterRule extends ActionRule<GainLetter> {
  onRuleStart(): MaterialMove[] {
    const playerMoves = this.getPlayerMoves()
    if (playerMoves.length === 1) {
      return playerMoves
    }
    return []
  }

  getPlayerMoves() {
    return this.gainLetter(this.action.quantity).slice(0, 1)
  }

  gainLetter(quantity = 1) {
    const moves: MaterialMove[] = []
    const supply = this.material(MaterialType.Letter).location(LocationType.LetterDeck)
    const supplyQuantity = supply.getQuantity()
    const supplyMissing = quantity - supplyQuantity
    if (supplyQuantity > 0) {
      moves.push(supply.moveItem({ type: LocationType.PlayerLetterDeck, player: this.player }, Math.min(quantity, supplyQuantity)))
    }
    if (supplyMissing > 0) {
      const rivalStock = this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(getRival(this.player))
      const rivalAvailableStock = Math.max(rivalStock.getQuantity() - 6, 0)
      const quantityLost = supplyMissing - rivalAvailableStock
      if (rivalAvailableStock > 0) {
        moves.push(rivalStock.moveItem({ type: LocationType.PlayerLetterDeck, player: this.player }, Math.min(supplyMissing, rivalAvailableStock)))
      }
      if (quantityLost > 0) {
        moves.push(this.customMove(CustomMoveType.LetterForgo, { quantity: quantityLost }))
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      this.action.quantity = (this.action.quantity ?? 1) - (move.quantity ?? 1)
      if (this.action.quantity) {
        return this.gainLetter(this.action.quantity)
      } else {
        moves.push(this.startNextRule())
      }
    }
    return moves
  }
}
