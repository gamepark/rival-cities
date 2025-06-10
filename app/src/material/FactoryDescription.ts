import { css, Interpolation, Theme } from '@emotion/react'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import FactoryFront from '../images/tokens/FactoryFront.png'
import FactoryBack from '../images/tokens/FactoryBack.png'

export class FactoryDescription extends CardDescription {
  width = 2.4
  height = 2.4

  backImage = FactoryBack

  image = FactoryFront

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }

  getFrontExtraCss(): Interpolation<Theme> {
    return css`
      clip-path: polygon(44% 2%, 55% 2%, 98% 34%, 98% 98%, 2% 98%, 2% 34%);
    `
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.Factory)(move) && move.itemIndex === context.index
  }
}

export const factoryDescription = new FactoryDescription()
