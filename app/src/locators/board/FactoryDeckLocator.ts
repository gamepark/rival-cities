import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class FactoryDeckLocator extends DeckLocator {

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 16, y: base.y - 26 }
  }
}

export const factoryDeckLocator = new FactoryDeckLocator()
