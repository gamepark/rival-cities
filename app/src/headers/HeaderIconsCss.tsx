import { Product } from '@gamepark/rival-cities/material/Product'
import Beer from '../images/icons/Beer.png'
import Cloth from '../images/icons/Cloth.png'
import Furniture from '../images/icons/Furniture.png'
import Leather from '../images/icons/Leather.png'
import ProductIcon from '../images/icons/Product.png'

export function getProductIcon(product?: Product) {
  switch (product) {
    case Product.Beer:
      return Beer
    case Product.Leather:
      return Leather
    case Product.Cloth:
      return Cloth
    case Product.Furniture:
      return Furniture
    default:
      return ProductIcon
  }
}
