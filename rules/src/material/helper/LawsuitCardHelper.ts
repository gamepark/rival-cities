import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { NextRuleHelper } from '../../rules/helper/NextRuleHelper'
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
    return [this.getProductMove(Product.Leather)]
  }

  lawersuitCard1ActionOnWin(): MaterialMove[] {
    return [this.getProductMove(Product.Leather), this.getProductMove(Product.Leather), this.getProductMove(Product.Leather), this.movePrestigeMarker(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  lawersuitCard2ActionOnAdvance(): MaterialMove[] {
    return [this.getProductMove(Product.Furniture)]
  }

  lawersuitCard2ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  lawersuitCard3ActionOnAdvance(): MaterialMove[] {
    return [this.getProductMove(Product.Cloth)]
  }

  lawersuitCard3ActionOnWin(): MaterialMove[] {
    return [this.startPlayerTurn(RuleId.Choose2Product, this.player)]
  }

  lawersuitCard4ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard4ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  lawersuitCard5ActionOnAdvance(): MaterialMove[] {
    return [...this.returnFactoryMove(), ...this.returnFactoryMove()]
  }

  lawersuitCard5ActionOnWin(): MaterialMove[] {
    return [this.getProductMove(Product.Beer), this.getProductMove(Product.Beer), this.getProductMove(Product.Beer), this.getStarTokensMove(), this.getStarTokensMove(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  lawersuitCard6ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard6ActionOnWin(): MaterialMove[] {
    return [this.getLetterMove(), this.getLetterMove(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  lawersuitCard7ActionOnAdvance(): MaterialMove[] {
    return [this.getProductMove(Product.Beer)]
  }

  lawersuitCard7ActionOnWin(): MaterialMove[] {
    return [this.movePrestigeMarker(), this.startPlayerTurn(RuleId.Choose1Product, this.player)]
  }

  lawersuitCard8ActionOnAdvance(): MaterialMove[] {
    return [this.getProductMove(Product.Beer), this.getLetterMove()]
  }

  lawersuitCard8ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  lawersuitCard9ActionOnAdvance(): MaterialMove[] {
    return [this.movePrestigeMarker()]
  }

  lawersuitCard9ActionOnWin(): MaterialMove[] {
    return [this.getLetterMove(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  lawersuitCard10ActionOnAdvance(): MaterialMove[] {
    return [this.getProductMove(Product.Cloth)]
  }

  lawersuitCard10ActionOnWin(): MaterialMove[] {
    return [this.buildFactoryMove(), this.startRule(RuleId.OffSeasonChangeSpecialCards)]
  }

  private movePrestigeMarker(): MaterialMove {
    const prestigeMarkerMove = this.player === City.Altona ? -1 : 1
    return this.material(MaterialType.PrestigeMarker)
        .location(LocationType.PrestigeMarkerPiste)
        .moveItem(({ location }) => ({ ...location, x: location.x! + prestigeMarkerMove }))
    
  }

  private getProductMove(product: Product): MaterialMove {
    return this.material(MaterialType.Product)
      .location(LocationType.ProductPiles)
      .id(product)
      .moveItem({ type: LocationType.PlayerProducts, player: this.player, id: product })
  }

  private getStarTokensMove(): MaterialMove {
    return this.material(MaterialType.StarToken)
      .location(LocationType.StarTokenDeck)
      .moveItem({ type: LocationType.PlayerStarTokens, player: this.player })
  }

  private getLetterMove(): MaterialMove {
    return this.material(MaterialType.Letter)
      .location(LocationType.LetterDeck)
      .moveItem({ type: LocationType.PlayerLetterDeck, player: this.player })
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
