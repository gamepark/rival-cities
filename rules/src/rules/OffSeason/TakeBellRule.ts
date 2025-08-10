import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class TakeBellRule extends PlayerTurnRule {
  onRuleStart() {
    // TODO: move this memory where it belongs
    this.memorize(Memory.ShipsIdsAlreadyProcessed, [])
    return [
      this.material(MaterialType.BellToken).moveItem({ type: LocationType.PlayerBellToken, player: this.player }),
      this.startSimultaneousRule(RuleId.OffSeasonPayForAlliance)
    ]
  }
}
