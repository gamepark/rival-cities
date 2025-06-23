import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpecialActionCard, specialActionCardActions } from '../material/SpecialActionCard'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class ChooseSpecialActionRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.playerSpecialActionCards.moveItems({ type: LocationType.SpecialActionCardsDiscard }))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) {
      const cardId = this.material(MaterialType.SpecialActionCard).index(move.itemIndex).getItem()?.id as SpecialActionCard
      this.memorize(MemoryType.ComputedActions, specialActionCardActions[cardId])
      return [this.startRule(RuleId.SpecialAction)]
    }
    return []
  }

  get playerSpecialActionCards() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.PlayerSpecialActionCardsHand).player(this.player)
  }
}
