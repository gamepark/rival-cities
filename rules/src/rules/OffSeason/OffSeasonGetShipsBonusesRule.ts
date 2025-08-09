import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Action } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Ship, shipData, ShipEffectType } from '../../material/Ship'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class OffSeasonGetShipsBonusesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const playerShips = this.playerShips
    const shipToProcess = playerShips.find((it) => !this.remind<Ship[]>(MemoryType.ShipsIdsAlreadyProcessed).includes(it.id))

    if (shipToProcess) {
      const effect = shipData[shipToProcess.id].effect
      if (effect?.type === ShipEffectType.OffSeasonBonus) {
        this.memorize<Ship[]>(MemoryType.ShipsIdsAlreadyProcessed, (old) => [...old, shipToProcess.id])
        this.memorize(
          MemoryType.PendingRule,
          this.remind<Ship[]>(MemoryType.ShipsIdsAlreadyProcessed).length === playerShips.length
            ? RuleId.OffSeasonGetPrestigeBonuses
            : RuleId.OffSeasonGetShipsBonuses
        )
        this.memorize(MemoryType.Actions, structuredClone(effect.actions))
        return [this.startRule(ActionRuleIds[this.remind<Action[]>(MemoryType.Actions)[0].type])]
      }
    }

    return [this.startRule(RuleId.OffSeasonGetPrestigeBonuses)]
  }

  get playerShips() {
    const shipCards = this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).getItems<Ship>()

    // TODO: order should not matter
    return shipCards.sort((a, b) => {
      if (a.id === Ship.Ship8) return 1
      if (b.id === Ship.Ship8) return -1
      return a.id - b.id
    })
  }
}
