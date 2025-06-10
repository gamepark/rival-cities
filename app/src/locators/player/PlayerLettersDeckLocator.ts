/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerLettersDeckLocator extends DeckLocator {

  getCoordinates(location: Location) {
    if(location.player === City.Altona) {
      return { x: -30, y: 10 }
    }
    return { x: 44, y: 10 }
  }
}

export const playerLettersDeckLocator = new PlayerLettersDeckLocator()
