import { ActionType } from '../ActionType'
import { GainLetterActionRule } from './GainLetterActionRule'

export class Gain2LetterActionRule extends GainLetterActionRule {
  actionType = ActionType.Gain2Letter
  nbLettersToTake = 2
}
