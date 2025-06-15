import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class OffSeasonTakeBellRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return [this.material(MaterialType.BellToken).moveItem({type: LocationType.PlayerBellToken, player: this.player})]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItemType(MaterialType.BellToken)(move)) {
      return [this.startSimultaneousRule(RuleId.OffSeasonPayForAlliance)]
    }
    return []
  }
}
