import { ListLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class ShipCardsRiverLocator extends ListLocator {
  gap = { x: 5 }

  getRotateZ(): number {
    return 180
  }

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 14.5, y: base.y + 4.5 }
  }
}

export const shipCardsRiverLocator = new ShipCardsRiverLocator()
