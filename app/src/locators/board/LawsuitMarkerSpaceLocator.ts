import { Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Location } from '@gamepark/rules-api'

class LawsuitMarkerSpaceLocator extends Locator {
  parentItemType = MaterialType.LawsuitPiece
  positionOnParent = { x: 40, y: -10 }
  rotateZ = 45

  getPositionOnParent(location: Location) {
    return { x: 50.7 + 7.3 * location.x!, y: 66 }
  }
}

export const lawsuitMarkerSpaceLocator = new LawsuitMarkerSpaceLocator()
