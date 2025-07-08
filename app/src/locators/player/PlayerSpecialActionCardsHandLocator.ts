import { HandLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location } from '@gamepark/rules-api'

class PlayerSpecialActionCardsHandLocator extends HandLocator {
  radius = 50

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -38, y: 20 }
    }
    return { x: 35, y: 20 }
  }

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2.5)', 'translateY(-1.5em)']
  }
}

export const playerSpecialActionCardsHandLocator = new PlayerSpecialActionCardsHandLocator()
