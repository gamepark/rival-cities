import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PurchaseShip } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Ship, shipData, ShipEffectType } from '../../material/Ship'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class PurchaseShipRule extends ActionRule<PurchaseShip> {
  getPlayerMoves() {
    const discount = this.discount
    const products = this.products
    const affordableShips = this.material(MaterialType.ShipCard)
      .location(LocationType.ShipSpace)
      .id<Ship>((ship) => {
        const cost = shipData[ship].cost
        return products.id(cost.product).getQuantity() >= cost.amount - discount
      })
    return [...affordableShips.moveItems({ type: LocationType.PlayerShipCards, player: this.player }), this.customMove(CustomMoveType.Pass)]
  }

  get products() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get discount() {
    return this.material(MaterialType.ShipCard).id(Ship.Ship19).getItem()?.location.player === this.player ? 1 : 0
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      const ship = this.material(MaterialType.ShipCard).getItem<Ship>(move.itemIndex).id
      const cost = shipData[ship].cost
      moves.push(this.products.id(cost.product).moveItem({ type: LocationType.ProductPiles, id: cost.product }, cost.amount - this.discount))
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      const ship = this.material(MaterialType.ShipCard).getItem<Ship>(move.itemIndex).id
      const effect = shipData[ship].effect
      if (effect?.type === ShipEffectType.Instant && effect.actions) {
        for (const action of effect.actions) {
          this.addActions(action)
        }
      }
      const deck = this.material(MaterialType.ShipCard).location(LocationType.ShipStack).deck()
      if (deck.length) {
        moves.push(deck.dealOne({ type: LocationType.ShipSpace }))
      }
      moves.push(this.startNextRule())
    }
    return moves
  }
}
