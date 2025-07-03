/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { cardPisteLocator } from './CardPisteLocator'

class InkJarPisteLocator extends Locator {
  getRotateZ(location: Location): number {
    return cardPisteLocator.getRotateZ(location)
  }

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = cardPisteLocator.getCoordinates(location)
    return { x: base.x! + coordinatesFromId[location.id].x, y: base.y! + coordinatesFromId[location.id].y }
  }

  getLocations(): Partial<Location>[] {
    const locations: Partial<Location>[] = []
    for (let i = 0; i < 20; i++) {
      locations.push({ type: LocationType.InkJarPiste, id: i })
    }
    return locations
  }

  locationDescription = new InkjarPisteDescription()
}

class InkjarPisteDescription extends DropAreaDescription {
  width = 2.7
  height = 2.55
  extraCss = css`
    background-color: rgba(0, 255, 0, 0.3);

    &:hover {
      background-color: rgba(0, 255, 0, 0.6) !important;
    }
  `

  canShortClick(move: MaterialMove, location: Location): boolean {
    return isMoveItemType(MaterialType.InkJar)(move) && move.location.type === LocationType.InkJarPiste &&  move.location.id === location.id
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
