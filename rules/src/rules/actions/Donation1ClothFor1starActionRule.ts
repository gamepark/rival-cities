import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { DonationActionRule } from './DonationActionRule'

export class Donation1ClothFor1starActionRule extends DonationActionRule {
  actionType = ActionType.Donation1ClothFor1star
  productType = Product.Cloth
  nbProduct = 1
  nbStars = 1
}
