import { Locator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { cardPisteLocator } from './CardPisteLocator'

class InkJarPisteLocator extends Locator {
  getRotateZ(location: Location): number {
    return cardPisteLocator.getRotateZ(location)
  }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = cardPisteLocator.getCoordinates(location)
    return { x: base.x! + coordinatesFromId[location.id].x, y: base.y! + coordinatesFromId[location.id].y }
  }
}

const coordinatesFromId = [
  { x: 1.5, y: 6.5 },
  { x: 0.5, y: 3 },
  { x: -0.7, y: 3 },
  { x: -3, y: 0 },
  { x: -3, y: 1 },
  { x: -3, y: 1.5 },
  { x: -3, y: 0 },
  { x: -3, y: 0 },
  { x: -0.7, y: -3 },
  { x: -1, y: -3 },
  { x: 0, y: -3 },
  { x: -1.3, y: -3 },
  { x: 0.4, y: -3 },
  { x: 3, y: 0 },
  { x: 3, y: -0.3 },
  { x: 3, y: 0 },
  { x: 3, y: -0.3 },
  { x: 3, y: 0.2 },
  { x: 0.9, y: 3 },
  { x: 0.2, y: 3 },
]

export const inkJarPisteLocator = new InkJarPisteLocator()
