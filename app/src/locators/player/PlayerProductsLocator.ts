/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class PlayerProductsLocator extends PileLocator {
  radius = 1
  limit = 12

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = this.getBaseCoordinates(location)
    return { x: base.x! + 4 * (location.id - 1), y: base.y }
  }

  getBaseCoordinates(location: Location): Partial<Coordinates> {
    if(location.player === City.Altona) {
      return { x: -47, y: 6 }
    }
    return { x: 27, y: 6 }
  }

  getPileId(item: MaterialItem): string {
    return `player-${item.id}`
  }
}

export const playerProductsLocator = new PlayerProductsLocator()
