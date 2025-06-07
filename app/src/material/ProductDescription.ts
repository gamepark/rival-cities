import { ComponentSize, TokenDescription } from '@gamepark/react-game'
import { Product } from '@gamepark/rival-cities/material/Product'
import Beer from '../images/tokens/resources/Beer.png'
import Leather from '../images/tokens/resources/Leather.png'
import Cloth from '../images/tokens/resources/Cloth.png'
import Furniture from '../images/tokens/resources/Furniture.png'

export class ProductDescription extends TokenDescription {
  getSize(id: Product): ComponentSize {
    return productSize[id]
  }

  images = {
    [Product.Beer]: Beer,
    [Product.Leather]: Leather,
    [Product.Cloth]: Cloth,
    [Product.Furniture]: Furniture
  }
}

const productSize = {
  [Product.Beer]: { width: 2, height: 2.09 },
  [Product.Leather]: { width: 2, height: 2.42 },
  [Product.Cloth]: { width: 2, height: 1.64 },
  [Product.Furniture]: { width: 2, height: 2.11 }
}

export const productDescription = new ProductDescription()
