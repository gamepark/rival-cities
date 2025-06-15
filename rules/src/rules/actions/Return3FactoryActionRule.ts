import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'

export class Return3FactoryActionRule extends PlayerTurnRule {
  actionType = ActionType.Return3Factory
  computedActionHelper = new ComputedActionsHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.playerFactories.length === 0) return this.computedActionHelper.removeActionAndWait(this.actionType)
    return [...this.playerFactories.limit(3).rotateItems(undefined)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItemType(MaterialType.Factory)(move)) {
      return this.computedActionHelper.removeActionAndWait(this.actionType)
    }
    return moves
  }

  get playerFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(true)
  }
}
