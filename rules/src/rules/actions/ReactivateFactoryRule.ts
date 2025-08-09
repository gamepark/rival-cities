import { ReactivateFactory } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionRule } from './ActionRule'

export class ReactivateFactoryRule extends ActionRule<ReactivateFactory> {
  onRuleStart() {
    const factories = this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(true).limit(this.action.count)
    return [...factories.rotateItems(undefined), this.endAction()]
  }
}
