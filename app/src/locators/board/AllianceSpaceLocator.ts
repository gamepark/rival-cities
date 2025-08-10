import { DropAreaDescription, FlexLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { allianceCardDescription } from '../../material/AllianceCardDescription'

class AllianceSpaceLocator extends FlexLocator {
  parentItemType = MaterialType.GameBoard
  coordinates = { x: 5.95, y: 9.65 }
  lineSize = 2
  maxLines = 2
  gap = { x: 7.1, y: -0.25 }
  lineGap = { x: 0.15, y: 4.55 }
  rotateZ = -2
  getHoverTransform = () => ['translateZ(10em)', 'scale(2.5)']

  // TODO: Fix size of FlexLocator automatically generated drop area
  locationDescription = new DropAreaDescription({
    width: allianceCardDescription.width * 2 + 0.5,
    height: allianceCardDescription.height * 2 + 0.5,
    borderRadius: allianceCardDescription.borderRadius
  })
}

export const allianceSpaceLocator = new AllianceSpaceLocator()
