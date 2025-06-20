import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleMove } from '@gamepark/rules-api/dist/material/moves'
import { RuleStep } from '@gamepark/rules-api/dist/material/rules/RuleStep'
import { City } from '../City'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Product } from '../material/Product'
import { ActionType } from './ActionType'
import { ComputedActionsHelper } from './helper/ComputedActionsHelper'
import { MemoryType } from './MemoryType'
import { EndOfGameHelper } from './helper/EndOfGameHelper'

export class EarnPrestigeAgainRule extends PlayerTurnRule {
  actionType = ActionType.EarnPrestige
  computedActionHelper?: ComputedActionsHelper
  productType = Product.Beer
  price = 2

  onRuleStart(_: RuleMove, previousRule: RuleStep): MaterialMove[] {
    this.computedActionHelper = new ComputedActionsHelper(this.game, previousRule.player)
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), this.price)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItemType(MaterialType.Product)(move)) {
      const move = this.player === City.Altona ? -1 : 1
      return [this.prestigeMarker.moveItem(({ location }) => ({ ...location, x: location.x! + move }))]
    }
    if(isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      this.forget(MemoryType.BasicActionChoosen)
      return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.computedActionHelper?.removeActionAndWait(this.actionType) ?? [])
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).id(this.productType).player(this.player)
  }

  get prestigeMarker() {
    return this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste)
  }
}
