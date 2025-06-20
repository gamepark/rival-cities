import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'

export class OffSeasonPlayerWithMostShipCardsEarnPrestigeRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.getPlayerShipCardsLength(City.Altona) === this.getPlayerShipCardsLength(City.Hamburg)) {
      return [this.startRule(RuleId.OffSeasonGetShipsBonuses)]
    }
    const markerMove = this.getPlayerShipCardsLength(City.Altona) > this.getPlayerShipCardsLength(City.Hamburg) ? -1 : 1
    return [
      this.material(MaterialType.PrestigeMarker)
        .location(LocationType.PrestigeMarkerPiste)
        .moveItem(({ location }) => ({ ...location, x: location.x! + markerMove }))
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      return new EndOfGameHelper(this.game).checkInstantEndOfGame([this.startRule(RuleId.OffSeasonGetShipsBonuses)])
    }
    return []
  }

  getPlayerShipCardsLength(player: City) {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(player).length
  }
}
