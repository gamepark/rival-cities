import { Locator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerBellTokenLocator extends Locator {

  getCoordinates(location: Location) {
    if(location.player === City.Altona) {
      return { x: -21, y: 21 }
    }
    return { x: 21, y: 21 }
  }
}

export const playerBellTokenLocator = new PlayerBellTokenLocator()