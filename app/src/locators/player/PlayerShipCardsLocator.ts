/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerShipCardsLocator extends ListLocator {
  gap = { x: 2.5 }
  maxCount = 3

  getCoordinates(location: Location) {
    if(location.player === City.Altona) {
      return { x: -46, y: -10 }
    }
    return { x: 28, y: -10 }
  }
}

export const playerShipCardsLocator = new PlayerShipCardsLocator()
