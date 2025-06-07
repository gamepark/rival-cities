import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class SepcialActionCardsDiscardLocator extends DeckLocator {

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 9, y: base.y - 27 }
  }
}

export const sepcialActionCardsDiscardLocator = new SepcialActionCardsDiscardLocator()
