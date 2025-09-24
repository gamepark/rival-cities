import { FlexLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerProductsLocator extends FlexLocator {
  gap = { x: 1.7 }
  lineGap = { y: 1.7 }
  lineSize = 3
  maxLines = 4

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = this.getBaseCoordinates(location)
    return { x: base.x! + 6 * (location.id - 1), y: base.y }
  }

  getBaseCoordinates(location: Location): Partial<Coordinates> {
    if (location.player === City.Altona) {
      return { x: -48, y: -15 }
    }
    return { x: 26, y: -15 }
  }
}

export const playerProductsLocator = new PlayerProductsLocator()
