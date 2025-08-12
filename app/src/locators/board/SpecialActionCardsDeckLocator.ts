import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'

class SpecialActionCardsDeckLocator extends DeckLocator {
  parentItemType = MaterialType.GameBoard
  gap = { x: 0.05, y: -0.05 }
  rotateZ = 88
  positionOnParent = { x: 12, y: 84 }
}

export const specialActionCardsDeckLocator = new SpecialActionCardsDeckLocator()
