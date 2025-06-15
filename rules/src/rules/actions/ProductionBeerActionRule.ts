import { Product } from '../../material/Product'
import { ProductionActionRule } from './ProductionActionRule'

export class ProductionBeerActionRule extends ProductionActionRule {
  productType = Product.Beer
}
