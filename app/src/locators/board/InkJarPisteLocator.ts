/** @jsxImportSource @emotion/react */
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { InkJarPisteHelper } from '@gamepark/rival-cities/rules/helper/InkjarPisteHelper'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { cardPisteLocator } from './CardPisteLocator'

class InkJarPisteLocator extends Locator {
  parentItemType = MaterialType.GameBoard
  getRotateZ(location: Location): number {
    return cardPisteLocator.getRotateZ(location)
  }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = cardPisteLocator.getCoordinates(location)
    const coordinates = coordinatesFromId[location.id as number]
    return { x: base.x! + coordinates.x, y: base.y! + coordinates.y }
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    if (context.rules.game.rule?.player !== context.player) return []
    if (context.rules.game.rule?.id !== RuleId.AdvanceInkJar) return []
    return new InkJarPisteHelper(context.rules.game).possibleInkjarLocation()
  }

  locationDescription = new InkjarPisteDescription()
}

class InkjarPisteDescription extends DropAreaDescription {
  width = 2.7
  height = 2.55

  canShortClick(move: MaterialMove, location: Location): boolean {
    return isMoveItemType(MaterialType.InkJar)(move) && move.location.type === LocationType.InkJarPiste && move.location.id === location.id
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
  { x: 0.2, y: 3 }
]

export const inkJarPisteLocator = new InkJarPisteLocator()
