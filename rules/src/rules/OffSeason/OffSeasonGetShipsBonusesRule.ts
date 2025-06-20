import { isMoveItemType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'

export class OffSeasonGetShipsBonusesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.shipsOffSeason.length === 0) {
      return [this.startRule(RuleId.OffSeasonGetPrestigeBonuses)]
    }
    const moves: MaterialMove[] = []
    this.memorize<number>(MemoryType.ProcessedBonuses, 0)
    this.shipsOffSeason.forEach((it) => {
      const shipCardData = shipCardsData[it.id as ShipCard]
      if (shipCardData.effect.action) {
        moves.push(...shipCardData.effect.action(this.game, it.location.player!))
      }
    })
    return moves
  }

  afterItemMove(move: MaterialMove): MaterialMove[] {
    if (this.remind<number>(MemoryType.ProcessedBonuses) === this.shipsOffSeason.length) {
      if(isMoveItemType(MaterialType.PrestigeMarker)(move)) {
        return new EndOfGameHelper(this.game).checkInstantEndOfGame([this.startRule(RuleId.OffSeasonGetPrestigeBonuses)])
      }
      return [this.startRule(RuleId.OffSeasonGetPrestigeBonuses)]
    }
    return []
  }

  get shipsOffSeason() {
    const shipCards = this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .filter((it) => shipCardsData[it.id as ShipCard].effect.type === ShipEffectType.OffSeason)
      .getItems()

    return shipCards.sort((a, b) => {
      if(a.id === ShipCard.Ship8) return 1
      if(b.id === ShipCard.Ship8) return -1
      return a.id - b.id
    })
  }
}
