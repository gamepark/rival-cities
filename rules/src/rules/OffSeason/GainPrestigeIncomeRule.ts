import { PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { Action, ActionType } from '../../material/Action'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class GainPrestigeIncomeRule extends PlayerTurnRule {
  onRuleStart() {
    const prestigeMarkerX = this.material(MaterialType.PrestigeMarker).getItem()!.location.x!
    const x = Math.abs(prestigeMarkerX)
    const actions: Action[] = []
    if (x >= 7) {
      actions.push({ type: ActionType.GainStars, stars: 1 })
    }
    if (x >= 6) {
      actions.push({ type: ActionType.GainLetter })
    }
    if (x >= 5) {
      actions.push({ type: ActionType.GainProducts, product: Product.Furniture, quantity: 1 })
    }
    if (x >= 4) {
      actions.push({ type: ActionType.GainProducts, product: Product.Leather, quantity: 1 })
    }
    if (x >= 3) {
      actions.push({ type: ActionType.GainProducts, product: Product.Cloth, quantity: 1 })
    }
    if (x >= 2) {
      actions.push({ type: ActionType.GainProducts, product: Product.Beer, quantity: 1 })
    }
    actions.push({ type: ActionType.ResolveLawsuit })
    const player = prestigeMarkerX < 0 ? City.Altona : City.Hamburg
    this.memorize(Memory.Actions, actions)
    this.memorize(Memory.PendingRule, RuleId.ReplaceSpecialActionCards)
    return [this.startPlayerTurn(ActionRuleIds[actions[0].type], player)]
  }
}
