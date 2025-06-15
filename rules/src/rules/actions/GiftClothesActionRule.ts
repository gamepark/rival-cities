import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { GiftActionRule } from './GiftActionRule'

export class GiftClothesActionRule extends GiftActionRule {
  actionType = ActionType.GiftClothes
  productType = Product.Cloth
}
