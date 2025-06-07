import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
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
}

export const letterDescription = new LetterDescription()
