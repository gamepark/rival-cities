import { CardDescription, ItemContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import LetterFront from '../images/tokens/LetterFront.jpg'
import LetterBack from '../images/tokens/LetterBack.jpg'

export class LetterDescription extends CardDescription {
  width = 3
  height = 1.9

  backImage = LetterBack

  image = LetterFront

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.Letter)(move) && context.index === move.itemIndex
  }
}

export const letterDescription = new LetterDescription()
