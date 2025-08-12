import { Location, PlayerTurnRule } from '@gamepark/rules-api'
import { range, sumBy } from 'lodash'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Ship } from '../../material/Ship'

export const INK_SPACES = 20

export class InkJarPisteHelper extends PlayerTurnRule {
  possibleInkJarLocation(): Location[] {
    const currentPosition = this.material(MaterialType.InkJar).getItem()!.location.id as number
    return range(1, this.maximumDistance + 1).map((distance) => ({ type: LocationType.InkSpace, id: (currentPosition + distance) % INK_SPACES }))
  }

  get maximumDistance() {
    const products = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).getQuantity()
    const productsDiscount = this.hasShip17 ? products + 1 : products
    return productsDiscount < 2 ? 2 + productsDiscount : 3 + Math.floor(productsDiscount / 2)
  }

  getMovementCost(distance: number) {
    const freeSpaces = this.hasShip17 ? 3 : 2
    if (distance <= freeSpaces) return 0
    return sumBy(range(freeSpaces + 1, distance + 1), (distance) => (distance > 4 ? 2 : 1))
  }

  get hasShip17() {
    return this.material(MaterialType.ShipCard).id(Ship.Ship17).getItem()?.location.player === this.player
  }
}
