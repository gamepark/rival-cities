import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { AllianceCard } from '../AllianceCard'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Product } from '../Product'

export class AllianceCardHelper extends MaterialRulesPart {
  player?: number
  nextPlayer?: number

  constructor(game: MaterialGame, player = game.rule?.player ?? 0) {
    super(game)
    this.player = player
    this.nextPlayer = game.players.find((player) => player !== this.player)
  }

  checkPlayerAllianceCardById(allianceCard: AllianceCard) {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(allianceCard).length > 0
  }

  getOsloProducts(moveProduct: Product): MaterialMove[] {
    return [...this.getProductsFromAllianceCard(moveProduct, Product.Furniture, AllianceCard.AllianceOslo)]
  }

  getNovgorodProducts(moveProduct: Product): MaterialMove[] {
    return [...this.getProductsFromAllianceCard(moveProduct, Product.Leather, AllianceCard.AllianceNovgorod)]
  }

  getLondonProducts(moveProduct: Product): MaterialMove[] {
    return [...this.getProductsFromAllianceCard(moveProduct, Product.Cloth, AllianceCard.AllianceLondon)]
  }

  private getProductsFromAllianceCard(product: Product, allianceProduct: Product, allianceCard: AllianceCard): MaterialMove[] {
    const alliance = this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(allianceCard)
    if (alliance.length && product === allianceProduct) {
      return [this.allProducts.id(product).moveItem({ type: LocationType.PlayerProducts, id: allianceProduct, player: this.player })]
    }
    return []
  }

  get allProducts() {
    const resourcesInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles)

    if (resourcesInReserve.length > 0) return resourcesInReserve

    const opponentResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer)
    const playerResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)

    if (opponentResource.length > playerResource.length) return opponentResource

    return resourcesInReserve
  }
}
