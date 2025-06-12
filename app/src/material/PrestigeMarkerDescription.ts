import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import PrestigeMarker from '../images/tokens/PrestigeMarker.png'

export class PrestigeMarkerDescription extends TokenDescription {
  width = 2.1
  height = 1.8

  image = PrestigeMarker

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.PrestigeMarker)(move) && move.itemIndex === context.index
  }
}

export const prestigeMarkerDescription = new PrestigeMarkerDescription()
