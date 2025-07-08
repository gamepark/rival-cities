import { Locator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { gameBoardLocator } from '../GameBoardLocator'

class CardPisteLocator extends Locator {
  getRotateZ(location: Location): number {
    return rotateZFromId[location.id]
  }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = gameBoardLocator.coordinates
    return { x: base.x + coordinatesFromId[location.id].x, y: base.y + coordinatesFromId[location.id].y }
  }

  getHoverTransform(item: MaterialItem): string[] {
    return [
      'translateZ(10em)',
      'scale(2.5)',
      `rotateZ(${-this.getRotateZ(item.location)}deg)`,
      `translateY(${hoverTranslateYFromId[item.location.id as number]}em)`
    ]
  }
}

const rotateZFromId = [0, 0, 0, 90, 90, 90, 90, 90, 180, 180, 180, 180, 180, -90, -90, -90, -90, -90, 0, 0]

const coordinatesFromId = [
  { x: 0.1, y: -24.6 },
  { x: 7.8, y: -21.1 },
  { x: 15.1, y: -21.1 },
  { x: 21.1, y: -15 },
  { x: 21.1, y: -7.5 },
  { x: 21.1, y: 0 },
  { x: 21.1, y: 7.5 },
  { x: 21.1, y: 15 },
  { x: 15, y: 21.1 },
  { x: 7.5, y: 21.1 },
  { x: 0, y: 21.1 },
  { x: -7.5, y: 21.1 },
  { x: -15, y: 21.1 },
  { x: -21.1, y: 15 },
  { x: -21.1, y: 7.5 },
  { x: -21.1, y: 0 },
  { x: -21.1, y: -7.5 },
  { x: -21.1, y: -15 },
  { x: -15, y: -21.1 },
  { x: -7.5, y: -21.1 }
]
const hoverTranslateYFromId = [4, 0, 0, 0, 0, 0, 0, 0, -1.5, -1.5, -1.5, -1.5, -1.5, 0, 0, 0, 0, 0, 0, 0]

export const cardPisteLocator = new CardPisteLocator()
