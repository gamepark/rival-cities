/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerStarTokensLocator extends PileLocator {
  radius = 1

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -26, y: -6 }
    }
    return { x: 47, y: -6 }
  }
}

export const playerStarTokensLocator = new PlayerStarTokensLocator()
