import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Action } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class OffSeasonGetShipsBonusesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const shipToProcess = this.shipsOffSeason.find((it) => !this.remind<ShipCard[]>(MemoryType.ShipsIdsAlreadyProcessed).includes(it.id as ShipCard))

    if (shipToProcess) {
      const shipCardData = shipCardsData[shipToProcess.id as ShipCard]
      if (shipCardData.effect.getActions) {
        this.memorize<ShipCard[]>(MemoryType.ShipsIdsAlreadyProcessed, (old) => [...old, shipToProcess.id as ShipCard])
        this.memorize(
          MemoryType.PendingRule,
          this.remind<ShipCard[]>(MemoryType.ShipsIdsAlreadyProcessed).length === this.shipsOffSeason.length
            ? RuleId.OffSeasonGetPrestigeBonuses
            : RuleId.OffSeasonGetShipsBonuses
        )
        this.memorize(MemoryType.Actions, shipCardData.effect.getActions(this.game, this.player))
        return [this.startRule(ActionRuleIds[this.remind<Action[]>(MemoryType.Actions)[0].type])]
      }
    }

    return [this.startRule(RuleId.OffSeasonGetPrestigeBonuses)]
  }

  get shipsOffSeason() {
    const shipCards = this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .filter((it) => shipCardsData[it.id as ShipCard].effect.type === ShipEffectType.OffSeason)
      .getItems()

    return shipCards.sort((a, b) => {
      if (a.id === ShipCard.Ship8) return 1
      if (b.id === ShipCard.Ship8) return -1
      return a.id - b.id
    })
  }
}
