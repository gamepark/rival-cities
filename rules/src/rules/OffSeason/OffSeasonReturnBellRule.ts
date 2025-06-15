import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class OffSeasonReturnBellRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return [this.material(MaterialType.BellToken).moveItem({ type: LocationType.BellTokenIdle })]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.BellToken)(move)) {
      return [this.startRule(RuleId.ChooseAction)]
    }
    return []
  }
}
