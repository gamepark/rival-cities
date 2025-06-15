import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class OffSeasonReactivateFactoriesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.factories.length === 0) {
      return [this.startPlayerTurn(RuleId.OffSeasonReturnBell, this.playerWithBell)]
    }
    return [this.factories.moveItemsAtOnce({ rotation: undefined })]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Factory)(move)) {
      return [this.startPlayerTurn(RuleId.OffSeasonReturnBell, this.playerWithBell)]
    }
    return []
  }

  get factories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).rotation(true)
  }

  get playerWithBell() {
    return this.material(MaterialType.BellToken).getItem()?.location.player!
  }
}
