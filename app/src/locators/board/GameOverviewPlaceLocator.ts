import { Locator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class GameOverviewPlaceLocator extends Locator {

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 4.4, y: base.y + 12.5 }
  }
}

export const gameOverviewPlaceLocator = new GameOverviewPlaceLocator()
