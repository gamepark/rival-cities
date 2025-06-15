import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { DonationActionRule } from './DonationActionRule'

export class Donation3BeerFor1StarActionRule extends DonationActionRule {
  actionType = ActionType.Donation3BeerFor1Star
  productType = Product.Beer
  nbProduct = 3
  nbStars = 1
}
