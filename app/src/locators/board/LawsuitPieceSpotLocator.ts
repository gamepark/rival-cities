import { Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Location } from '@gamepark/rules-api'

class LawsuitPieceSpotLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getCoordinates(location: Location) {
    switch (location.x) {
      case 0:
        return { x: -12.4, y: -11.6 }
      case 1:
        return { x: -2.8, y: -11.1 }
      case 2:
      default:
        return { x: 6.8, y: -11.5 }
    }
  }
}

export const lawsuitPieceSpotLocator = new LawsuitPieceSpotLocator()
