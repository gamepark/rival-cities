import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { Production } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { getShipData, ShipEffectType } from '../../material/ShipCard'
import { CustomMoveType } from '../CustomMoveType'
import { GainProductsRule } from './GainProductsRule'

export class ProductionRule extends GainProductsRule<Production> {
  onGainProduct(product: Product, quantity: number = 1): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.action.quantity) {
      moves.push(this.availableFactories.rotateItem(true))
    }
    moves.push(...super.onGainProduct(product, quantity))
    return moves
  }

  triggerProductGainedEffects(product: Product) {
    const moves = super.triggerProductGainedEffects(product)
    if (!this.action.productsGained) {
      for (const ship of this.playerShips) {
        if (getShipData(ship).effect.type === ShipEffectType.OnProduction) {
          moves.push(this.customMove(CustomMoveType.TriggerShipEffect, ship))
        }
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.TriggerShipEffect) {
      this.action.quantity++
      const product = getShipData(move.data as number).effect.product!
      return this.gainProduct(product)
    }
    return super.onCustomMove(move)
  }

  get canGainMore() {
    return this.action.quantity > 0 || this.availableFactories.length > 0
  }

  get availableFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(undefined)
  }

  get playerShips() {
    return this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .player(this.player)
      .getItems<number>()
      .map((item) => item.id)
  }
}
