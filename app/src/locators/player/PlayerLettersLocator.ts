/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerLettersLocator extends ListLocator {
  gap = { x: 3.5 }
  maxCount = 6

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -48, y: -6 }
    }
    return { x: 26, y: -6 }
  }
}

export const playerLettersLocator = new PlayerLettersLocator()
