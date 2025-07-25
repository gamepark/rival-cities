import { ListLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class LawsuitCardsRiverLocator extends ListLocator {
  parentItemType = MaterialType.GameBoard

  gap = { x: 9.6 }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x - 13.2, y: base.y - (location.z === 1 ? 13.8 : 14.3) }
  }

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2.5)']
  }
}

export const lawsuitCardsRiverLocator = new LawsuitCardsRiverLocator()
