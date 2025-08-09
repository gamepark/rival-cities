import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { Gift, Production } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product, PRODUCTS_QUANTITY } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export abstract class GainProductsRule<E extends Gift | Production> extends ActionRule<E> {
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

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      const product = this.material(MaterialType.Product).getItem<Product>(move.itemIndex).id
      if (!this.action.productsGained?.includes(product)) {
        this.action.productsGained ??= []
        this.action.productsGained.push(product)
        if (this.gainAdditionalProduct(product)) {
          return this.gainProduct(product)
        }
      }
    }
    return []
  }

  gainAdditionalProduct(product: Product) {
    switch (product) {
      case Product.Cloth:
        return this.hasAlliance(Alliance.London)
      case Product.Leather:
        return this.hasAlliance(Alliance.Novgorod)
      case Product.Furniture:
        return this.hasAlliance(Alliance.Oslo)
    }
    return false
  }
}
