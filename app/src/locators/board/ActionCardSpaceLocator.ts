import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'

class ActionCardSpaceLocator extends Locator {
  parentItemType = MaterialType.GameBoard

  getSide(id: number) {
    return Math.floor((id + 2) / 5) % 4
  }

  getSideX(id: number) {
    return (id + 2) % 5
  }

  getRotateZ(location: Location) {
    return this.getSide(location.id) * 90
  }

  getPositionOnParent(location: Location) {
    const delta = this.getSideX(location.id) * 19.8 + 10.6
    switch (this.getSide(location.id)) {
      case 0:
        return { x: delta, y: 0 }
      case 1:
        return { x: 100, y: delta }
      case 2:
        return { x: 100 - delta, y: 100 }
      case 3:
      default:
        return { x: 0, y: 100 - delta }
    }
  }

  placeItem(item: MaterialItem, context: ItemContext) {
    return super.placeItem(item, context).concat(`translateY(-${context.material[context.type]!.height! / 2}em)`)
  }

  getHoverTransform(item: MaterialItem): string[] {
    const translateY = item.location.id === 0 ? 4 : this.getSide(item.location.id) === 2 ? -1.5 : 0
    return ['translateZ(10em)', 'scale(2.5)', `rotateZ(${-this.getRotateZ(item.location)}deg)`, `translateY(${translateY}em)`]
  }
}

export const actionCardSpaceLocator = new ActionCardSpaceLocator()
