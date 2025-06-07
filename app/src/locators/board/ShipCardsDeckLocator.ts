import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class ShipCardsDeckLocator extends DeckLocator {

  getRotateZ(): number {
    return 90
  }

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 7.5, y: base.y + 4.5 }
  }
}

export const shipCardsDeckLocator = new ShipCardsDeckLocator()
