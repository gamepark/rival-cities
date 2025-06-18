import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { ProductionActionRule } from './ProductionActionRule'

export class ProductionLeatherActionRule extends ProductionActionRule {
  actionType = ActionType.ProductionLeather
  productType = Product.Leather
}
