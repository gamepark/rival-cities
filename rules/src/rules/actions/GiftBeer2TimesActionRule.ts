import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { GiftActionRule } from './GiftActionRule'

export class GiftBeer2TimesActionRule extends GiftActionRule {
  actionType = ActionType.GiftBeer2Time
  productType = Product.Beer
  nbProductToTake = 2
}
