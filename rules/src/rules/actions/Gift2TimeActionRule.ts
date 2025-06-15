import { ActionType } from '../ActionType'
import { GiftActionRule } from './GiftActionRule'

export class Gift2TimeActionRule extends GiftActionRule {
  actionType = ActionType.Gift2Time
  nbProductToTake = 2
}
