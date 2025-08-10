import { PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { Action } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Ship, shipData, ShipEffectType } from '../../material/Ship'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class GainShipsIncomeRule extends PlayerTurnRule {
  onRuleStart() {
    const altonaIncome = this.getIncome(City.Altona)
    const hamburgIncome = this.getIncome(City.Hamburg)
    if (altonaIncome.length && hamburgIncome.length) {
      hamburgIncome[0].isRivalTurn = true
    }
    if (altonaIncome.length || hamburgIncome.length) {
      const actions = [...altonaIncome, ...hamburgIncome]
      this.memorize(Memory.PendingRule, RuleId.GainPrestigeIncome)
      this.memorize(Memory.Actions, actions)
      return [this.startPlayerTurn(ActionRuleIds[actions[0].type], altonaIncome.length ? City.Altona : City.Hamburg)]
    } else {
      return [this.startRule(RuleId.GainPrestigeIncome)]
    }
  }

  getIncome(player: City) {
    const income: Action[] = []
    const ships = this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(player)
    for (const ship of ships.getItems<Ship>()) {
      const effect = shipData[ship.id].effect
      if (effect?.type === ShipEffectType.Income) {
        income.push(structuredClone(effect.action))
      }
    }
    return income
  }
}
