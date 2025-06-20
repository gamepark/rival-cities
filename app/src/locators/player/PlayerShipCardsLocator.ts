/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerShipCardsLocator extends ListLocator {
  gap = { x: 5 }
  maxCount = 5

  getCoordinates(location: Location) {
    if(location.player === City.Altona) {
      return { x: -47, y: -13 }
    }
    return { x: 27, y: -13 }
  }
}

export const playerShipCardsLocator = new PlayerShipCardsLocator()
