import { Product } from '../material/Product'
import { EarnPrestigeAgainRule } from './EarnPrestigeAgainRule'

export class AllianceCardEarnPrestigeAgainRule extends EarnPrestigeAgainRule {
  productType = Product.Furniture
  price = 1
}
