import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PurchaseShip } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getShipData, ShipEffectType } from '../../material/Ship'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class PurchaseShipRule extends ActionRule<PurchaseShip> {
  getPlayerMoves() {
    const discount = this.discount
    const products = this.products
    const affordableShips = this.material(MaterialType.ShipCard)
      .location(LocationType.ShipCardsRiver)
      .id<number>((ship) => {
        const cost = getShipData(ship).cost
        return products.id(cost.type).getQuantity() >= cost.quantity - discount
      })
    return [...affordableShips.moveItems({ type: LocationType.PlayerShipCards, player: this.player }), this.customMove(CustomMoveType.Pass)]
  }

  get products() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get discount() {
    return this.material(MaterialType.ShipCard).id(19).getItem()?.location.player === this.player ? 1 : 0
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      const ship = this.material(MaterialType.ShipCard).getItem<number>(move.itemIndex).id
      const cost = getShipData(ship).cost
      moves.push(this.products.id(cost.type).moveItem({ type: LocationType.ProductPiles, id: cost.type }, cost.quantity - this.discount))
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      const ship = this.material(MaterialType.ShipCard).getItem<number>(move.itemIndex).id
      const effect = getShipData(ship).effect
      if (effect?.type === ShipEffectType.Instant && effect.actions) {
        for (const action of effect.actions) {
          this.addActionBonus(action)
        }
      }
      const deck = this.material(MaterialType.ShipCard).location(LocationType.ShipCardsDeck).deck()
      if (deck.length) {
        moves.push(deck.dealOne({ type: LocationType.ShipCardsRiver }))
      }
      moves.push(this.endAction())
    }
    return moves
  }
}
