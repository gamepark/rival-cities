import { CardDescription, ItemContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import StarToken from '../images/tokens/Star.jpg'

export class StarTokenDescription extends CardDescription {
  width = 1.7
  height = 1.7
  borderRadius = 0.9

  image = StarToken

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.StarToken)(move) && move.itemIndex === context.index
  }
}

export const starTokenDescription = new StarTokenDescription()
