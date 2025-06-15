import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { DonationActionRule } from './DonationActionRule'

export class Donation3BeerFor1Star2TimesActionRule extends DonationActionRule {
  actionType = ActionType.Donation3BeerFor1Star
  productType = Product.Beer
  nbProduct = 3
  nbStars = 1
  nbTimes = 2
}
