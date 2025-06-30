/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerLawsuitCardsLocator extends ListLocator {
  gap = { x: 7 }
  maxCount = 3

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -46, y: 13 }
    }
    return { x: 28, y: 13 }
  }
}

export const playerLawsuitCardsLocator = new PlayerLawsuitCardsLocator()
