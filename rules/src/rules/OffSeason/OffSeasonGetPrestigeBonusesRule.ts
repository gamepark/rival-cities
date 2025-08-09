import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { ActionType } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class OffSeasonGetPrestigeBonusesRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (Math.abs(this.prestigeMarkerLocation) < 2) {
      return [this.startResolveLawsuit()]
    }
    return this.getBonusesMoves()
  }

  getBonusesMoves() {
    const moves: MaterialMove[] = []
    const player = this.prestigeMarkerLocation < 0 ? City.Altona : City.Hamburg

    switch (Math.abs(this.prestigeMarkerLocation)) {
      case 0:
        break
      case 1:
        break
      case 2:
        moves.push(this.getProducts(Product.Beer).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }))
        break
      case 3:
        moves.push(this.getProducts(Product.Beer).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }))
        moves.push(this.getProducts(Product.Cloth).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Cloth }))
        break
      case 4:
        moves.push(this.getProducts(Product.Beer).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }))
        moves.push(this.getProducts(Product.Cloth).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Cloth }))
        moves.push(this.getProducts(Product.Leather).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Leather }))
        break
      case 5:
        moves.push(this.getProducts(Product.Beer).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }))
        moves.push(this.getProducts(Product.Cloth).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Cloth }))
        moves.push(this.getProducts(Product.Leather).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Leather }))
        moves.push(this.getProducts(Product.Furniture).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Furniture }))
        break
      case 6:
        moves.push(this.getProducts(Product.Beer).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }))
        moves.push(this.getProducts(Product.Cloth).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Cloth }))
        moves.push(this.getProducts(Product.Leather).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Leather }))
        moves.push(this.getProducts(Product.Furniture).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Furniture }))
        moves.push(this.getLetters().moveItem({ type: LocationType.PlayerLetterDeck, player }))
        break
      default:
        moves.push(this.getProducts(Product.Beer).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }))
        moves.push(this.getProducts(Product.Cloth).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Cloth }))
        moves.push(this.getProducts(Product.Leather).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Leather }))
        moves.push(this.getProducts(Product.Furniture).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Furniture }))
        moves.push(this.getLetters().moveItem({ type: LocationType.PlayerLetterDeck, player }))
        moves.push(this.getStarsTokens().moveItem({ type: LocationType.PlayerStarTokens, player }))
    }
    moves.push(this.startResolveLawsuit())
    return moves
  }

  get prestigeMarkerLocation() {
    return this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste).getItem()!.location.x!
  }

  getProducts(product: Product) {
    const productsInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles).id(product)

    if (productsInReserve.length > 0) return productsInReserve

    const opponentProduct = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer).id(product)
    const playerProduct = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(product)

    if (opponentProduct.length > playerProduct.length) return opponentProduct

    return productsInReserve
  }

  getLetters() {
    const lettersInReserve = this.material(MaterialType.Letter).location(LocationType.LetterDeck)

    if (lettersInReserve.length > 0) return lettersInReserve

    const opponentLetters = this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.nextPlayer)
    const playerLetters = this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)

    if (opponentLetters.length > playerLetters.length) return opponentLetters

    return lettersInReserve
  }

  startResolveLawsuit() {
    this.memorize(MemoryType.PendingRule, RuleId.OffSeasonChangeSpecialCards)
    this.memorize(MemoryType.Actions, [{ type: ActionType.ResolveLawsuit }])
    return this.startRule(RuleId.ResolveLawsuit)
  }

  getStarsTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }
}
