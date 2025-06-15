import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { DonationActionRule } from './DonationActionRule'

export class Donation1LeatherFor1star2TimesActionRule extends DonationActionRule {
  actionType = ActionType.Donation1LeatherFor1star2Times
  productType = Product.Leather
  nbProduct = 1
  nbStars = 1
  nbTimes = 2
}
