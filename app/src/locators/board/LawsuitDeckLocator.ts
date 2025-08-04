import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class LawsuitDeckLocator extends DeckLocator {
  parentItemType = MaterialType.GameBoard

  getRotateZ(): number {
    return -90
  }

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 14.5, y: base.y + -13 }
  }
}

export const lawsuitDeckLocator = new LawsuitDeckLocator()
