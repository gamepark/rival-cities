import { Locator } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class AllianceCardsLayoutLocator extends Locator {
  getRotateZ(): number {
    return -2
  }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    const itemCoordinates = coordinates[location.x!] as XYCoordinates
    return { x: base.x + itemCoordinates.x, y: base.y + itemCoordinates.y }
  }
}

const coordinates = [
  { x: 6.2, y: 14.2 },
  { x: 6, y: 9.7 },
  { x: 13.1, y: 9.4 },
  { x: 13.3, y: 13.9 }
]

export const allianceCardsLayoutLocator = new AllianceCardsLayoutLocator()
