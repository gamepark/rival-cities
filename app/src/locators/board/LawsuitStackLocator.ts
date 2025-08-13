import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'

class LawsuitStackLocator extends DeckLocator {
  parentItemType = MaterialType.GameBoard
  rotateZ = -89
  positionOnParent = { x: 87.7, y: 18.2 }
  gap = { x: 0.05, y: -0.05 }
}

export const lawsuitStackLocator = new LawsuitStackLocator()
