/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { Location, MaterialItem } from '@gamepark/rules-api'

class PlayerAlliancesLocator extends ListLocator {
  gap = { x: 7 }
  maxCount = 3

  getCoordinates(location: Location) {
    if (location.player === City.Altona) {
      return { x: -46, y: -1 }
    }
    return { x: 28, y: -1 }
  }

  getHoverTransform(item: MaterialItem): string[] {
    return ['translateZ(10em)', 'scale(2.5)', `translateX(${this.getHoverTranslateX(item.location)}em)`]
  }

  private getHoverTranslateX(location: Location): number {
    const locationX = location.x ?? 0
    if (location.player === City.Altona && locationX === 0) {
      return 2
    }
    if (location.player === City.Hamburg && locationX > 1) {
      return -0.5
    }
    return 0
  }
}

export const playerAlliancesLocator = new PlayerAlliancesLocator()
