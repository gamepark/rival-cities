import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class StarTokenSupplyLocator extends DeckLocator {
  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 20, y: base.y - 26 }
  }
}

export const starTokenSupplyLocator = new StarTokenSupplyLocator()
