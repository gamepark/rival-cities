import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class LawsuitCardDeckLocator extends DeckLocator {

  getRotateZ(): number {
    return -90
  }

  getCoordinates(): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + 14.5, y: base.y + -13 }
  }
}

export const lawsuitCardDeckLocator = new LawsuitCardDeckLocator()
