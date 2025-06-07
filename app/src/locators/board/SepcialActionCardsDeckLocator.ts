import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class SepcialActionCardsDeckLocator extends DeckLocator {
  gap = { x: -0.05, y: -0.02 }
  getRotateZ(): number {
    return 90
  }

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 13.5, y: base.y + 12 }
  }
}

export const sepcialActionCardsDeckLocator = new SepcialActionCardsDeckLocator()
