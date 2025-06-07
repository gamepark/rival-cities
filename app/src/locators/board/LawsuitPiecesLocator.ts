import { Locator } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class LawsuitPiecesLocator extends Locator {

  getRotateZ(): number {
    return -90
  }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    const itemCoordinates = coordinates[location.id!] as XYCoordinates
    return { x: base.x + itemCoordinates.x, y: base.y + itemCoordinates.y }
  }
}

const coordinates = [
  { x: -12.4, y: -11.6 },
  { x: -2.8, y: -11 },
  { x: 6.8, y: -11.6 }
]

export const lawsuitPiecesLocator = new LawsuitPiecesLocator()
