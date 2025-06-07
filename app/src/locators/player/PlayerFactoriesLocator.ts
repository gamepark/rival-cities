/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerFactoriesLocator extends ListLocator {
  gap = { x: 2.5 }
  maxCount = 6

  getCoordinates(location: Location) {
    if(location.player === City.Altona) {
      return { x: -48, y: 10 }
    }
    return { x: 26, y: 10 }
  }
}

export const playerFactoriesLocator = new PlayerFactoriesLocator()
