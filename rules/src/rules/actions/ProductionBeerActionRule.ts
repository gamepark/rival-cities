import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { ProductionActionRule } from './ProductionActionRule'

export class ProductionBeerActionRule extends ProductionActionRule {
  actionType = ActionType.ProductionBeer
  productType = Product.Beer
  quantity = 2
}
