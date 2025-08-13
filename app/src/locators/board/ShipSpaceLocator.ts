import { Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Location } from '@gamepark/rules-api'

class ShipSpaceLocator extends Locator {
  parentItemType = MaterialType.GameBoard
  rotateZ = -1

  getPositionOnParent(location: Location) {
    switch (location.x) {
      case 0:
        return { x: 11.7, y: 63.7 }
      case 1:
        return { x: 24, y: 63.6 }
      case 2:
        return { x: 36.7, y: 60.6 }
      case 3:
      default:
        return { x: 49.3, y: 62.7 }
    }
  }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2.5)']
}

export const shipSpaceLocator = new ShipSpaceLocator()
