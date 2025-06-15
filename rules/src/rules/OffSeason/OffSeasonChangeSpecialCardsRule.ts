import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../../constantes'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class OffSeasonChangeSpecialCardsRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    specialActionCardPlaces.forEach((id, index) => {
      const card = this.material(MaterialType.SpecialActionCard).location((loc) => loc.type === LocationType.CardPiste && loc.id === id)
      if (card.length) {
        moves.push(card.moveItem({ type: LocationType.SpecialActionCardsDiscard }))
      }
      moves.push(
        this.material(MaterialType.SpecialActionCard)
          .location((loc) => loc.type === LocationType.SpecialActionCardsDeck && loc.x === index)
          .moveItem({
            type: LocationType.CardPiste,
            id
          })
      )
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.id === 16) {
      return [this.startRule(RuleId.OffSeasonReactivateFactories)]
    }
    return []
  }
}
