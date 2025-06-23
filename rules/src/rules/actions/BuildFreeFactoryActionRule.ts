import { ActionType } from '../ActionType'
import { BuildFactoryActionRule } from './BuildFactoryActionRule'

export class BuildFreeFactoryActionRule extends BuildFactoryActionRule {
  actionType = ActionType.BuildFreeFactory
  price = 0
}
