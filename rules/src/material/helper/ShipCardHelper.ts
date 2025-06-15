import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { MemoryType } from '../../rules/MemoryType'
import { Product } from '../Product'

export class ShipCardHelper extends MaterialRulesPart {
  player: number

  constructor(game: MaterialGame, player: number) {
    super(game)
    this.player = player
  }

  shipCard6(): MaterialMove[] {
    this.addProcessedShip()
    return this.getStarTokensMove(1)
  }

  shipCard7(): MaterialMove[] {
    this.addProcessedShip()
    return this.getProductMove(Product.Furniture, 2)
  }

  shipCard8(): MaterialMove[] {
    this.addProcessedShip()
    return [this.movePrestigeMarker()]
  }

  shipCard9(): MaterialMove[] {
    this.addProcessedShip()
    return this.getProductMove(Product.Cloth, 2)
  }

  shipCard10(): MaterialMove[] {
    this.addProcessedShip()
    return this.getLetterMove(1)
  }

  private movePrestigeMarker(): MaterialMove {
    const prestigeMarkerMove = this.player === City.Altona ? -1 : 1
    return this.material(MaterialType.PrestigeMarker)
      .location(LocationType.PrestigeMarkerPiste)
      .moveItem(({ location }) => ({ ...location, x: location.x! + prestigeMarkerMove }))
  }

  private getProductMove(product: Product, quantity: number): MaterialMove[] {
    return this.material(MaterialType.Product)
      .location(LocationType.ProductPiles)
      .id(product)
      .moveItems({ type: LocationType.PlayerProducts, player: this.player, id: product }, quantity)
  }

  private getStarTokensMove(quantity: number): MaterialMove[] {
    return this.material(MaterialType.StarToken)
      .location(LocationType.StarTokenDeck)
      .moveItems({ type: LocationType.PlayerStarTokens, player: this.player }, quantity)
  }

  private getLetterMove(quantity: number): MaterialMove[] {
    return this.material(MaterialType.Letter)
      .location(LocationType.LetterDeck)
      .moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, quantity)
  }

  private addProcessedShip() {
    this.memorize<number>(MemoryType.ProcessedBonuses, (old) => old + 1)
  }
}
