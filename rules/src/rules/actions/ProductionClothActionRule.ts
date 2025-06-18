import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { ProductionActionRule } from './ProductionActionRule'

export class ProductionClothActionRule extends ProductionActionRule {
  actionType = ActionType.ProductionCloth
  productType = Product.Cloth
}
