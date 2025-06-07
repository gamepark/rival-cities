import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class PrestigeMarkerPisteLocator extends Locator {
  gap = { x: 2.1, y: 0.05 }

  getRotateZ(): number {
    return 45
  }

  getCoordinates(location: Location, _context: MaterialContext): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return {x: base.x -0.5 + this.gap.x * location.x!, y: base.y - 3 + this.gap.y * location.x!}
  }
}

export const prestigeMarkerPisteLocator = new PrestigeMarkerPisteLocator()
