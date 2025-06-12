import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../../rules/RuleId'
import { Product } from '../Product'

export class LawsuitCardHelper extends MaterialRulesPart {
  player: number

  constructor(game: MaterialGame, player: number) {
    super(game)
    this.player = player
  }

  lawersuitCard1ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Leather, 1)]
  }

  lawersuitCard1ActionOnWin(): MaterialMove[] {
    return [...this.getProductMove(Product.Leather, 3), this.movePrestigeMarker()]
  }

  lawersuitCard2ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Furniture, 1)]
  }

  lawersuitCard2ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove()]
  }

  lawersuitCard3ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Cloth, 1)]
  }

  lawersuitCard3ActionOnWin(): MaterialMove[] {
    return [this.startRule(RuleId.Choose2Product)]
  }

  lawersuitCard4ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard4ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove()]
  }

  lawersuitCard5ActionOnAdvance(): MaterialMove[] {
    return [...this.returnFactoryMove(), ...this.returnFactoryMove()]
  }

  lawersuitCard5ActionOnWin(): MaterialMove[] {
    return [...this.getProductMove(Product.Beer, 3), ...this.getStarTokensMove(2)]
  }

  lawersuitCard6ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard6ActionOnWin(): MaterialMove[] {
    return [...this.getLetterMove(2)]
  }

  lawersuitCard7ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Beer, 1)]
  }

  lawersuitCard7ActionOnWin(): MaterialMove[] {
    return [this.movePrestigeMarker(), this.startRule(RuleId.Choose1Product)]
  }

  lawersuitCard8ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Beer, 1), ...this.getLetterMove(1)]
  }

  lawersuitCard8ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove()]
  }

  lawersuitCard9ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard9ActionOnWin(): MaterialMove[] {
    return [...this.getLetterMove(1)]
  }

  lawersuitCard10ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Cloth, 1)]
  }

  lawersuitCard10ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove()]
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

  private buildFactoryMove(): MaterialMove {
    return this.material(MaterialType.Factory).location(LocationType.FactoryDeck).moveItem({ type: LocationType.PlayerFactories, player: this.player })
  }

  private returnFactoryMove(): MaterialMove[] {
    const playerReturnedFactories = this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(true)
    if (playerReturnedFactories.length === 0) return []
    return [playerReturnedFactories.rotateItem(undefined)]
  }
}
