import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Action } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getShipData, ShipEffectType } from '../../material/Ship'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class OffSeasonGetShipsBonusesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const playerShips = this.playerShips
    const shipToProcess = playerShips.find((it) => !this.remind<number[]>(MemoryType.ShipsIdsAlreadyProcessed).includes(it.id))

    if (shipToProcess) {
      const shipData = getShipData(shipToProcess.id)
      if (shipData.effect?.type === ShipEffectType.OffSeasonBonus) {
        this.memorize<number[]>(MemoryType.ShipsIdsAlreadyProcessed, (old) => [...old, shipToProcess.id])
        this.memorize(
          MemoryType.PendingRule,
          this.remind<number[]>(MemoryType.ShipsIdsAlreadyProcessed).length === playerShips.length
            ? RuleId.OffSeasonGetPrestigeBonuses
            : RuleId.OffSeasonGetShipsBonuses
        )
        this.memorize(MemoryType.Actions, JSON.parse(JSON.stringify(shipData.effect.actions)))
        return [this.startRule(ActionRuleIds[this.remind<Action[]>(MemoryType.Actions)[0].type])]
      }
    }

    return [this.startRule(RuleId.OffSeasonGetPrestigeBonuses)]
  }

  get playerShips() {
    const shipCards = this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).getItems<number>()

    // TODO: order should not matter
    return shipCards.sort((a, b) => {
      if (a.id === 8) return 1
      if (b.id === 8) return -1
      return a.id - b.id
    })
  }
}
