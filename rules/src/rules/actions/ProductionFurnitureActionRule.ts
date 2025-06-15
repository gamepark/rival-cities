import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { ProductionActionRule } from './ProductionActionRule'

export class ProductionFurnitureActionRule extends ProductionActionRule {
  actionType = ActionType.ProductionFurniture
  productType = Product.Furniture
}
