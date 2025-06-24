/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerStarTokensDeckLocator extends PileLocator {
  radius = 1

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -26, y: 18 }
    }
    return { x: 47, y: 18 }
  }
}

export const playerStarTokensDeckLocator = new PlayerStarTokensDeckLocator()
