import { DropAreaDescription, FlexLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class ProductSupplyLocator extends FlexLocator {
  gap = { x: 1.4 }
  lineGap = { y: 1.4 }
  lineSize = 4
  maxLines = 3

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = this.getBaseCoordinates()
    return { x: base.x! + 6.5 * (location.id - 1), y: base.y }
  }

  getBaseCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 29, y: base.y - 28 }
  }

  locationDescription = new ProductPileDescription()
}

class ProductPileDescription extends DropAreaDescription {
  width = 3
  height = 3
  borderRadius = 3
}

export const productSupplyLocator = new ProductSupplyLocator()
