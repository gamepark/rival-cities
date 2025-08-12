import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'

class ShipCardsDeckLocator extends DeckLocator {
  parentItemType = MaterialType.GameBoard
  gap = { x: 0.05, y: -0.05 }
  rotateZ = 91
  positionOnParent = { x: 68, y: 62 }
}

export const shipCardsDeckLocator = new ShipCardsDeckLocator()
