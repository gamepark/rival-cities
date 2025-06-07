import { ListLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class LawsuitCardsRiverLocator extends ListLocator {
  gap = { x: 9.6 }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    console.log(location)
    return { x: base.x - 13.2, y: base.y - (location.z === 1 ? 13.8 : 14.3) }
  }
}

export const lawsuitCardsRiverLocator = new LawsuitCardsRiverLocator()
