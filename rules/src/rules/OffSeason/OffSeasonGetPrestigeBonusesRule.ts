import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class OffSeasonGetPrestigeBonusesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (Math.abs(this.prestigeMarkerLocation) < 2) {
      return [this.startRule(RuleId.ResolveLawsuit)]
    }
    this.memorize(MemoryType.ProcessedBonuses, 0)
    const moves: MaterialMove[] = []
    const player = this.prestigeMarkerLocation < 0 ? City.Altona : City.Hamburg

    for (let i = 2; i <= Math.abs(this.prestigeMarkerLocation); i++) {
      switch (i) {
        case 2:
          moves.push(...this.getProducts(Product.Beer).moveItems({ type: LocationType.PlayerProducts, player, id: Product.Beer }))
          break
        case 3:
          moves.push(...this.getProducts(Product.Cloth).moveItems({ type: LocationType.PlayerProducts, player, id: Product.Cloth }))
          break
        case 4:
          moves.push(...this.getProducts(Product.Leather).moveItems({ type: LocationType.PlayerProducts, player, id: Product.Leather }))
          break
        case 5:
          moves.push(...this.getProducts(Product.Furniture).moveItems({ type: LocationType.PlayerProducts, player, id: Product.Furniture }))
          break
        case 6:
          moves.push(...this.getLetters().moveItems({ type: LocationType.PlayerLetterDeck, player }))
          break
        default:
          moves.push(...this.getStarsTokens().moveItems({ type: LocationType.PlayerStarTokens, player }))
      }
    }

    return moves
  }

  afterItemMove(): MaterialMove[] {
    if (this.remind<number>(MemoryType.ProcessedBonuses) === Math.abs(this.prestigeMarkerLocation)) {
      return [this.startRule(RuleId.ResolveLawsuit)]
    }
    return []
  }

  get prestigeMarkerLocation() {
    return this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste).getItem()?.location.x!
  }

  getProducts(productType: Product) {
    const resourcesInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles).id(productType)

    if (resourcesInReserve.length > 0) return resourcesInReserve

    const opponentResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer).id(productType)
    const playerResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(productType)

    if (opponentResource.length > playerResource.length) return opponentResource

    return resourcesInReserve
  }

  getLetters() {
    const lettersInReserve = this.material(MaterialType.Letter).location(LocationType.LetterDeck)

    if (lettersInReserve.length > 0) return lettersInReserve

    const opponentLetters = this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.nextPlayer)
    const playerLetters = this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)

    if (opponentLetters.length > playerLetters.length) return opponentLetters

    return lettersInReserve
  }

  getStarsTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }
}
