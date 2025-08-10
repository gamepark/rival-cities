import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class TakeBellRule extends PlayerTurnRule {
  onRuleStart() {
    // TODO: move this memory where it belongs
    this.memorize(Memory.ShipsIdsAlreadyProcessed, [])
    const playerWithAlliance = this.game.players.filter((player) => this.hasAlliance(player))
    return [
      this.material(MaterialType.BellToken).moveItem({ type: LocationType.PlayerBellToken, player: this.player }),
      this.startSimultaneousRule(RuleId.PayAlliancesUpkeep, playerWithAlliance)
    ]
  }

  hasAlliance(player: number) {
    return this.material(MaterialType.AllianceCard).player(player).length > 0
  }
}
