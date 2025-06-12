import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import LawsuitMarker from '../images/tokens/LawersuitMarker.png'

export class LawsuitMarkerDescription extends TokenDescription {
  width = 0.8
  height = 0.8

  image = LawsuitMarker

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.LawsuitMarker)(move) && context.index === move.itemIndex
  }
}

export const lawsuitMarkerDescription = new LawsuitMarkerDescription()
