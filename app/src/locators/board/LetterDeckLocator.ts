import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class LetterDeckLocator extends DeckLocator {

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 18, y: base.y - 29 }
  }
}

export const letterDeckLocator = new LetterDeckLocator()
