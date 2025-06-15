import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { GiftActionRule } from './GiftActionRule'

export class GiftBeerActionRule extends GiftActionRule {
  actionType = ActionType.GiftBeer
  productType = Product.Beer
}
