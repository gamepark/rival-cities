import { Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'

class LawsuitSpaceLocator extends Locator {
  parentItemType = MaterialType.LawsuitPiece
  positionOnParent = { x: 42, y: -15 }

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2.5)']
  }
}

export const lawsuitSpaceLocator = new LawsuitSpaceLocator()
