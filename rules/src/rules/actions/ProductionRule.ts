import { CustomMove, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Production } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { Ship, shipData, ShipEffectType } from '../../material/Ship'
import { CustomMoveType } from '../CustomMoveType'
import { GainProductsRule } from './GainProductsRule'

export class ProductionRule extends GainProductsRule<Production> {
  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Factory)(move) && !this.canGainMore) {
      return [this.startNextRule()]
    }
    return super.afterItemMove(move)
  }

  onGainProduct(product: Product, quantity = 1): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.action.quantity <= 0) {
      moves.push(this.availableFactories.rotateItem(true))
    }
    moves.push(...super.onGainProduct(product, quantity))
    return moves
  }

  triggerProductGainedEffects(product: Product) {
    const moves = super.triggerProductGainedEffects(product)
    if (!this.action.productsGained) {
      for (const ship of this.playerShips) {
        if (shipData[ship].effect?.type === ShipEffectType.ProductionBonus) {
          moves.push(this.customMove(CustomMoveType.TriggerShipEffect, ship))
        }
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.TriggerShipEffect) {
      this.action.quantity++
      const shipEffect = shipData[move.data as Ship].effect
      if (shipEffect?.type === ShipEffectType.ProductionBonus) {
        return this.gainProduct(shipEffect.product)
      }
    }
    return super.onCustomMove(move)
  }

  get canGainMore() {
    return this.action.quantity > 0 || this.availableFactories.length > 0
  }

  get availableFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(false)
  }

  get playerShips() {
    return this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .player(this.player)
      .getItems<Ship>()
      .map((item) => item.id)
  }
}
