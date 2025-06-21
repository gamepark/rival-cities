import { MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { EarnPrestigeActionRule } from '../actions/EarnPrestigeActionRule'
import { ActionType } from '../ActionType'

export class EarnPrestigeRule extends EarnPrestigeActionRule {
  actionType = ActionType.PurchaseShip

  onRuleStart(): MaterialMove[] {
    const move = this.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return [this.prestigeMarker.moveItem(({ location }) => ({ ...location, x: location.x! + move }))]
  }
}
