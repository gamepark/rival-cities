import { ListLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class ShipCardsRiverLocator extends ListLocator {
  gap = { x: 5 }

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 14.5, y: base.y + 4.5 }
  }

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2.5)']
  }
}

export const shipCardsRiverLocator = new ShipCardsRiverLocator()
