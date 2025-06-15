import { ActionType } from '../ActionType'
import { DrawSpecialActionCardActionRule } from './DrawSpecialActionCardActionRule'

export class Draw2SpecialActionCardActionRule extends DrawSpecialActionCardActionRule {
  actionType = ActionType.Draw2SpecialActionCard
  nbCardsToDraw = 2
}
