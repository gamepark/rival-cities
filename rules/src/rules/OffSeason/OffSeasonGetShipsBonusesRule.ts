import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Action } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getShipData, ShipEffectType } from '../../material/ShipCard'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class OffSeasonGetShipsBonusesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const shipToProcess = this.shipsOffSeason.find((it) => !this.remind<number[]>(MemoryType.ShipsIdsAlreadyProcessed).includes(it.id as number))

    if (shipToProcess) {
      const shipCardData = getShipData(shipToProcess.id as number)
      if (shipCardData.effect?.actions) {
        this.memorize<number[]>(MemoryType.ShipsIdsAlreadyProcessed, (old) => [...old, shipToProcess.id as number])
        this.memorize(
          MemoryType.PendingRule,
          this.remind<number[]>(MemoryType.ShipsIdsAlreadyProcessed).length === this.shipsOffSeason.length
            ? RuleId.OffSeasonGetPrestigeBonuses
            : RuleId.OffSeasonGetShipsBonuses
        )
        this.memorize(MemoryType.Actions, JSON.parse(JSON.stringify(shipCardData.effect.actions)))
        return [this.startRule(ActionRuleIds[this.remind<Action[]>(MemoryType.Actions)[0].type])]
      }
    }

    return [this.startRule(RuleId.OffSeasonGetPrestigeBonuses)]
  }

  get shipsOffSeason() {
    const shipCards = this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .id<number>((ship) => getShipData(ship).effect?.type === ShipEffectType.OffSeason)
      .getItems()

    return shipCards.sort((a, b) => {
      if (a.id === 8) return 1
      if (b.id === 8) return -1
      return a.id - b.id
    })
  }
}
