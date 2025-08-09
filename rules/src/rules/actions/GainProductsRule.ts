import { CustomMove, getEnumValues, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { ActionType, GainProducts, Production } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product, PRODUCTS_QUANTITY } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class GainProductsRule<E extends GainProducts | Production> extends ActionRule<E> {
  onRuleStart(): MaterialMove[] {
    const playerMoves = this.getPlayerMoves()
    if (playerMoves.length === 1) {
      return playerMoves
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.action.product) {
      moves.push(this.gainProduct(this.action.product, this.action.quantity)[0])
    } else {
      for (const product of getEnumValues(Product)) {
        const gain = this.gainProduct(product)[0]
        if (!isCustomMoveType(CustomMoveType.ProductForgo)(gain)) {
          moves.push(gain)
        }
      }
    }
    if (!moves.length || !this.action.quantity) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  gainProduct(product: Product, quantity = 1) {
    const moves: MaterialMove[] = []
    const supply = this.material(MaterialType.Product).location(LocationType.ProductPiles).id(product)
    const supplyQuantity = supply.getQuantity()
    const supplyMissing = quantity - supplyQuantity
    if (supplyQuantity > 0) {
      moves.push(supply.moveItem({ type: LocationType.PlayerProducts, player: this.player, id: product }, Math.min(quantity, supplyQuantity)))
    }
    if (supplyMissing > 0) {
      const rivalStock = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(getRival(this.player)).id(product)
      const rivalAvailableStock = Math.max(rivalStock.getQuantity() - PRODUCTS_QUANTITY / 2, 0)
      const quantityLost = supplyMissing - rivalAvailableStock
      if (rivalAvailableStock > 0) {
        moves.push(rivalStock.moveItem({ type: LocationType.PlayerProducts, player: this.player, id: product }, Math.min(supplyMissing, rivalAvailableStock)))
      }
      if (quantityLost > 0) {
        moves.push(this.customMove(CustomMoveType.ProductForgo, { product, quantity: quantityLost }))
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      const product = this.material(MaterialType.Product).getItem<Product>(move.itemIndex).id
      return this.onGainProduct(product, move.quantity)
    }
    return []
  }

  onGainProduct(product: Product, quantity = 1) {
    const moves: MaterialMove[] = this.triggerProductGainedEffects(product)
    if (!this.action.productsGained?.includes(product)) {
      this.action.productsGained ??= []
      this.action.productsGained.push(product)
    }
    this.action.quantity -= quantity
    if (!this.canGainMore) {
      moves.push(this.endAction())
    }
    return moves
  }

  triggerProductGainedEffects(product: Product) {
    const moves: MaterialMove[] = []
    if (!this.action.productsGained?.includes(product) && (this.action.type === ActionType.Production || this.action.isGift)) {
      const alliance = this.getBonusAlliance(product)
      if (alliance && this.hasAlliance(alliance)) {
        moves.push(this.customMove(CustomMoveType.TriggerAllianceEffect, alliance))
      }
    }
    return moves
  }

  getBonusAlliance(product: Product) {
    switch (product) {
      case Product.Cloth:
        return Alliance.London
      case Product.Leather:
        return Alliance.Novgorod
      case Product.Furniture:
        return Alliance.Oslo
      default:
        return undefined
    }
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.TriggerAllianceEffect) {
      this.action.quantity++
      const product = getEnumValues(Product).find((product) => this.getBonusAlliance(product) === move.data)!
      return this.gainProduct(product)
    }
    return super.onCustomMove(move)
  }

  get canGainMore() {
    return this.action.quantity > 0
  }
}
