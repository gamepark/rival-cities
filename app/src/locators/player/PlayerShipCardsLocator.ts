import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location, MaterialItem } from '@gamepark/rules-api'

class PlayerShipCardsLocator extends ListLocator {
  gap = { x: 5 }
  maxCount = 5

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -47, y: 6 }
    }
    return { x: 27, y: 6 }
  }

  getHoverTransform(item: MaterialItem): string[] {
    return ['translateZ(10em)', 'scale(2.5)', `translateX(${this.getHoverTranslateX(item.location)}em)`]
  }

  private getHoverTranslateX(location: Location): number {
    const locationX = location.x ?? 0
    if (location.player === City.Altona && locationX === 0) {
      return 1.3
    }
    if (location.player === City.Hamburg && locationX > 3) {
      return -1.3
    }
    return 0
  }
}

export const playerShipCardsLocator = new PlayerShipCardsLocator()
