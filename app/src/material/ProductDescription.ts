import { css, Interpolation, Theme } from '@emotion/react'
import { ComponentSize, ItemContext, TokenDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Product } from '@gamepark/rival-cities/material/Product'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
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

  getFrontExtraCss(itemId: Product): Interpolation<Theme> {
    switch (itemId) {
      case Product.Beer:
        return css`
          clip-path: polygon(34% 0, 85% 0, 94% 40%, 94% 72%, 70% 100%, 19% 100%, 9% 77%, 9% 29%);
        `
      case Product.Leather:
        return css`
          clip-path: polygon(
            18% 9%,
            31% 9%,
            46% 0%,
            63% 0%,
            70% 9%,
            91% 9%,
            100% 19%,
            82% 44%,
            86% 65%,
            100% 75%,
            79% 97%,
            63% 91%,
            46% 100%,
            22% 89%,
            10% 96%,
            0% 85%,
            15% 63%,
            17% 47%,
            0% 28%
          );
        `
      case Product.Cloth:
        return css`
          clip-path: polygon(47% 0%, 68% 0%, 81% 17%, 81% 45%, 94% 45%, 100% 55%, 66% 100%, 19% 100%, 3% 85%, 0% 62%, 3% 53%);
        `
      case Product.Furniture:
        return css`
          clip-path: polygon(15% 0%, 100% 0%, 92% 19%, 92% 79%, 71% 100%, 16% 100%, 15% 93%, 7% 93%, 7% 36%, 0% 16%);
        `
    }
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.Product)(move) && move.itemIndex === context.index
  }
}

const productSize = {
  [Product.Beer]: { width: 1.48, height: 1.6 },
  [Product.Leather]: { width: 1.33, height: 1.6 },
  [Product.Cloth]: { width: 1.35, height: 1 },
  [Product.Furniture]: { width: 1.53, height: 1.6 }
}

export const productDescription = new ProductDescription()
