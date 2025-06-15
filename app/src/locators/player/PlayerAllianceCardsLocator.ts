/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerAllianceCardsLocator extends ListLocator {
  gap = { x: 7 }
  maxCount = 3

  getCoordinates(location: Location) {
    if(location.player === City.Altona) {
      return { x: -46, y: 0 }
    }
    return { x: 28, y: 0 }
  }
}

export const playerAllianceCardsLocator = new PlayerAllianceCardsLocator()
