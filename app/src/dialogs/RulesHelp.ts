import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ChoiceHelp } from './ChoiceHelp'
import { ChooseActionHelp } from './ChooseActionHelp'
import { ComputedHelp } from './ComputedHelp'

export const RulesHelp = {
  [RuleId.Choice]: ChoiceHelp,
  [RuleId.Computed]: ComputedHelp,
  [RuleId.ChooseAction]: ChooseActionHelp
}
