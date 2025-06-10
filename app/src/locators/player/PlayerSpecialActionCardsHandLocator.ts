import { HandLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerSpecialActionCardsHandLocator extends HandLocator {
  radius = 50

  getItemRotateZ(): number {
    return 90
  }

  getCoordinates(location: Location) {
    if(location.player === City.Altona) {
      return { x: -38, y: 20 }
    }
    return { x: 36, y: 20 }
  }
}

export const playerSpecialActionCardsHandLocator = new PlayerSpecialActionCardsHandLocator()