/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerLettersDeckLocator extends ListLocator {
  gap = { x: 3.5 }
  maxCount = 7

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -48, y: 14 }
    }
    return { x: 26, y: 14 }
  }
}

export const playerLettersDeckLocator = new PlayerLettersDeckLocator()
