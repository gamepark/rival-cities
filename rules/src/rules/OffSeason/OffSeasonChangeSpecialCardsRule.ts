import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../../constantes'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class OffSeasonChangeSpecialCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const cardsOnBoard = this.material(MaterialType.SpecialActionCard)
      .location(LocationType.CardPiste)
      .sort((item) => item.location.id as number)
    return [...cardsOnBoard.moveItems({ type: LocationType.SpecialActionCardsDiscard }), this.dealActionCard(specialActionCardPlaces[0])]
  }

  dealActionCard(space: number) {
    const deck = this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDeck).deck()
    if (deck.length) {
      return deck.dealOne({ type: LocationType.CardPiste, id: space })
    } else {
      return this.startRule(RuleId.OffSeasonReactivateFactories)
    }
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.CardPiste && move.location.id === 16) {
      const nextSpace = specialActionCardPlaces[specialActionCardPlaces.indexOf(move.location.id as number) + 1]
      if (nextSpace !== undefined) {
        return [this.dealActionCard(nextSpace)]
      } else {
        return [this.startRule(RuleId.OffSeasonReactivateFactories)]
      }
    }
    return []
  }
}
