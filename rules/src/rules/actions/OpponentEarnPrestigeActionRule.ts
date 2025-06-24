import { MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { ActionType } from '../ActionType'
import { EarnPrestigeActionRule } from './EarnPrestigeActionRule'

export class OpponentEarnPrestigeActionRule extends EarnPrestigeActionRule {
  actionType = ActionType.OpponentEarnPrestige
  playerWhoEarnedPrestige = this.nextPlayer

  onRuleStart(): MaterialMove[] {
    const move = this.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return [this.prestigeMarker.moveItem(({ location }) => ({ ...location, x: location.x! + move }))]
  }
}
