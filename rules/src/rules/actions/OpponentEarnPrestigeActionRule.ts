import { ActionType } from '../ActionType'
import { EarnPrestigeActionRule } from './EarnPrestigeActionRule'

export class OpponentEarnPrestigeActionRule extends EarnPrestigeActionRule {
  actionType = ActionType.OpponentEarnPrestige
  playerWhoEarnedPrestige = this.nextPlayer
}
