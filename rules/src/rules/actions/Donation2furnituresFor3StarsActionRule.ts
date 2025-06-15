import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { DonationActionRule } from './DonationActionRule'

export class Donation2furnituresFor3StarsActionRule extends DonationActionRule {
  actionType = ActionType.Donation2furnituresFor3Stars
  productType = Product.Furniture
  nbProduct = 2
  nbStars = 3
}
