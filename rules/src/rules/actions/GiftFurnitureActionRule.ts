import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { GiftActionRule } from './GiftActionRule'

export class GiftFurnitureActionRule extends GiftActionRule {
  actionType = ActionType.GiftFurniture
  productType = Product.Furniture
}
