import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { NextRuleHelper } from '../../rules/helper/NextRuleHelper'
import { MemoryType } from '../../rules/MemoryType'
import { RuleId } from '../../rules/RuleId'
import { Product } from '../Product'

export class LawsuitCardHelper extends MaterialRulesPart {
  player: number
  nextRuleHelper: NextRuleHelper

  constructor(game: MaterialGame, player: number) {
    super(game)
    this.player = player
    this.nextRuleHelper = new NextRuleHelper(game, player)
  }

  lawersuitCard1ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Leather, 1)]
  }

  lawersuitCard1ActionOnWin(): MaterialMove[] {
    return [...this.getProductMove(Product.Leather, 3), this.movePrestigeMarker(), ...this.nextRuleHelper.moveToNextRule()]
  }

  lawersuitCard2ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Furniture, 1)]
  }

  lawersuitCard2ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), ...this.nextRuleHelper.moveToNextRule()]
  }

  lawersuitCard3ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Cloth, 1)]
  }

  lawersuitCard3ActionOnWin(): MaterialMove[] {
    this.memorize(MemoryType.NextRules, [RuleId.Choose2Product])
    return new NextRuleHelper(this.game, this.player).moveToNextRule()
  }

  lawersuitCard4ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard4ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), ...this.nextRuleHelper.moveToNextRule()]
  }

  lawersuitCard5ActionOnAdvance(): MaterialMove[] {
    return [...this.returnFactoryMove(), ...this.returnFactoryMove()]
  }

  lawersuitCard5ActionOnWin(): MaterialMove[] {
    return [...this.getProductMove(Product.Beer, 3), ...this.getStarTokensMove(2), ...this.nextRuleHelper.moveToNextRule()]
  }

  lawersuitCard6ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard6ActionOnWin(): MaterialMove[] {
    return [...this.getLetterMove(2), ...this.nextRuleHelper.moveToNextRule()]
  }

  lawersuitCard7ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Beer, 1)]
  }

  lawersuitCard7ActionOnWin(): MaterialMove[] {
    this.memorize(MemoryType.NextRules, [RuleId.Choose1Product])
    return [this.movePrestigeMarker(), ...new NextRuleHelper(this.game, this.player).moveToNextRule()]
  }

  lawersuitCard8ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Beer, 1), ...this.getLetterMove(1)]
  }

  lawersuitCard8ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), ...this.nextRuleHelper.moveToNextRule()]
  }

  lawersuitCard9ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard9ActionOnWin(): MaterialMove[] {
    return [...this.getLetterMove(1), ...this.nextRuleHelper.moveToNextRule()]
  }

  lawersuitCard10ActionOnAdvance(): MaterialMove[] {
    return [...this.getProductMove(Product.Cloth, 1)]
  }

  lawersuitCard10ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), ...this.nextRuleHelper.moveToNextRule()]
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
