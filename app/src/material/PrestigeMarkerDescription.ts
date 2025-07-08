import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import PrestigeMarker from '../images/tokens/PrestigeMarker.png'
import { css, Interpolation, Theme } from '@emotion/react'

export class PrestigeMarkerDescription extends TokenDescription {
  width = 2.1
  height = 1.8

  image = PrestigeMarker

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.PrestigeMarker)(move) && move.itemIndex === context.index
  }

  getFrontExtraCss(_itemId: any): Interpolation<Theme> {
    return css`
      clip-path: polygon(23% 0%, 40% 0%, 53% 16%, 69% 1%, 85% 1%, 95% 10%, 100% 23%, 100% 40%, 46% 100%, 0% 48%, 0% 24%);
    `
  }
}

export const prestigeMarkerDescription = new PrestigeMarkerDescription()
