import { Locator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class BellTokenIdleLocator extends Locator {
  getRotateZ(): number {
    return 10
  }

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 3.5, y: base.y - 18.5 }
  }
}

export const bellTokenIdleLocator = new BellTokenIdleLocator()
