import { Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Location } from '@gamepark/rules-api'

class PrestigeTrackLocator extends Locator {
  parentItemType = MaterialType.GameBoard
  rotateZ = 1

  getPositionOnParent(location: Location) {
    return { x: 48.5 + location.x! * 5.47, y: 42 + location.x! * 0.05 }
  }
}

export const prestigeTrackLocator = new PrestigeTrackLocator()
