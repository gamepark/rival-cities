import { isMoveItemType, isMoveItemTypeAtOnce, isShuffleItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../../constantes'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class ReplaceSpecialActionCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const cardsOnBoard = this.material(MaterialType.SpecialActionCard)
      .location(LocationType.ActionCardSpace)
      .sort((item) => item.location.id as number)
    if (cardsOnBoard.length) {
      return [cardsOnBoard.moveItemsAtOnce({ type: LocationType.SpecialActionCardsDiscard })]
    } else {
      return this.dealActionCard(specialActionCardPlaces[0])
    }
  }

  dealActionCard(space: number) {
    const deck = this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDeck).deck()
    if (deck.length) {
      return [deck.dealOne({ type: LocationType.ActionCardSpace, id: space })]
    } else if (this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDiscard).length) {
      return []
    } else {
      return [this.startRule(RuleId.ReactivateFactories)]
    }
  }

  afterItemMove(move: ItemMove) {
    if (
      (isMoveItemTypeAtOnce(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) ||
      (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.ActionCardSpace) ||
      isShuffleItemType(MaterialType.SpecialActionCard)(move)
    ) {
      const cardsOnPiste = this.material(MaterialType.SpecialActionCard).location(LocationType.ActionCardSpace)
      const nextSpace = specialActionCardPlaces.find((place) => cardsOnPiste.locationId(place).length === 0)
      if (nextSpace !== undefined) {
        return this.dealActionCard(nextSpace)
      } else {
        return [this.startRule(RuleId.ReactivateFactories)]
      }
    }
    return []
  }
}
