import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class ReturnBellRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.material(MaterialType.BellToken).moveItem({ type: LocationType.BellTokenSpot }), this.startRule(RuleId.ChooseAction)]
  }
}
