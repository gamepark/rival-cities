import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { lawsuitPiecesLocator } from './LawsuitPiecesLocator'

class LawsuitMarkerPisteLocator extends Locator {
  gap = { x: 0.65 }

  getRotateZ(): number {
    return 45
  }

  getCoordinates(location: Location, _context: MaterialContext): Partial<Coordinates> {
    const parentCoordinates = lawsuitPiecesLocator.getCoordinates(location)
    return {x: parentCoordinates.x! + 0.05 + this.gap.x * location.x!, y: parentCoordinates.y! + 0.65}
  }
}

export const lawsuitMarkerPisteLocator = new LawsuitMarkerPisteLocator()
