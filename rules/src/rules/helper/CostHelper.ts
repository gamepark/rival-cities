import { getEnumValues, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { City } from '../../City'
import { Cost, CostType } from '../../material/Cost'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'

export class CostHelper extends MaterialRulesPart {
  getProducts(player: City) {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(player)
  }

  getProduct(player: City, product: Product) {
    return this.getProducts(player).id(product)
  }

  getLetters(player: City) {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetters).player(player)
  }

  canPay(player: City, cost: Cost) {
    switch (cost.type) {
      case CostType.Product:
        return this.getProduct(player, cost.product).getQuantity() >= cost.amount
      case CostType.Products: {
        const products = this.getProducts(player)
        return getEnumValues(Product).every((product) => products.id(product).getQuantity() >= (cost.amount[product] ?? 0))
      }
      case CostType.AnyProducts:
        return this.getProducts(player).getQuantity() >= cost.amount
      case CostType.Letters:
        return this.material(MaterialType.Letter).location(LocationType.PlayerLetters).player(player).getQuantity() >= cost.amount
    }
  }

  pay(player: City, cost: Cost) {
    const moves: MaterialMove[] = []
    switch (cost.type) {
      case CostType.Product:
        moves.push(this.getProduct(player, cost.product).moveItem({ type: LocationType.ProductSupply, id: cost.product }, cost.amount))
        break
      case CostType.Products:
        for (const product of getEnumValues(Product)) {
          const amount = cost.amount[product]
          if (amount) {
            moves.push(this.getProduct(player, product).moveItem({ type: LocationType.ProductSupply, id: product }, amount))
          }
        }
        break
      case CostType.Letters:
        moves.push(this.getLetters(player).moveItem({ type: LocationType.LetterSupply }, 1))
        break
    }
    return moves
  }
}
