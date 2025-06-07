import { PileLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class StarTokenDeckLocator extends PileLocator {
  radius = 1
  limit = 12

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 20, y: base.y - 26 }
  }
}

export const starTokenDeckLocator = new StarTokenDeckLocator()
