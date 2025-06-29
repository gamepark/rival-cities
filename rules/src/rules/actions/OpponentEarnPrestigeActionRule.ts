import { OpponentEarnPrestigeAction } from '../../material/Actions/Actions'
import { ActionRule } from './ActionRule'

export class OpponentEarnPrestigeActionRule extends ActionRule<OpponentEarnPrestigeAction> {
  //onRuleStart(): MaterialMove[] {
  //  const move = this.action?.playerWhoEarnedPrestige === City.Altona ? -1 : 1
  //  return this.prestigeMarker.moveItem(({ location }) => ({ ...location, x: location.x! + move }))
  //}
}
