import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { ReturnFactoryAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionRule } from './ActionRule'

export class ReturnFactoryActionRule extends ActionRule<ReturnFactoryAction> {
  onRuleStart(): MaterialMove[] {
    if (this.playerFactories.length === 0) return this.removeActionAndMove()
    return this.playerFactories.limit(this.nbFactoryCanReturn).rotateItems(undefined)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Factory)(move)) {
      return this.removeActionAndMove()
    }
    return moves
  }

  get playerFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(true)
  }

  get nbFactoryCanReturn() {
    return this.action.nbFactoryCanReturn ?? 0
  }
}
