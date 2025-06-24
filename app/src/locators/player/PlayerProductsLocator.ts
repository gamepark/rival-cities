/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class PlayerProductsLocator extends ListLocator {
  gap = { x: 1.7 }
  maxCount = 12

  getCoordinates(location: Location): Partial<Coordinates> {
    const base = this.getBaseCoordinates(location)
    return { x: base.x, y: base.y! + 2.5 * (location.id - 1) }
  }

  getBaseCoordinates(location: Location): Partial<Coordinates> {
    if (location.player === City.Altona) {
      return { x: -47, y: -1 }
    }
    return { x: 27, y: -1 }
  }

  getPileId(item: MaterialItem): string {
    return `player-${item.id}`
  }
}

export const playerProductsLocator = new PlayerProductsLocator()
