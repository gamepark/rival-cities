import { PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class ProductPilesLocator extends PileLocator {
  radius = 1
  limit = 12

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = this.getBaseCoordinates()
    return { x: base.x! + 4 * (location.id - 1), y: base.y }
  }

  getBaseCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 20, y: base.y - 27 }
  }

  getPileId(item: MaterialItem): string {
    return `${item.id}`
  }
}

export const productPilesLocator = new ProductPilesLocator()
