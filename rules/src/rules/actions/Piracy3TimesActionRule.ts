import { ActionType } from '../ActionType'
import { PiracyActionRule } from './PiracyActionRule'

export class Piracy3TimesActionRule extends PiracyActionRule {
  actionType = ActionType.Piracy3times
  nbProductsToSteal = 3
}
