import { ReactivateFactoryAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionRule } from './ActionRule'

export class ReactivateFactoryActionRule extends ActionRule<ReactivateFactoryAction> {
  onRuleStart() {
    const factories = this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(true).limit(this.action.count)
    return [...factories.rotateItems(undefined), this.endAction()]
  }
}
