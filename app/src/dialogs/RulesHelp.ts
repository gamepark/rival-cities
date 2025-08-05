import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ChoiceHelp } from './ChoiceHelp'
import { ChooseActionHelp } from './ChooseActionHelp'
import { PerformMultipleActionsHelp } from './PerformMultipleActionsHelp'

export const RulesHelp = {
  [RuleId.Choice]: ChoiceHelp,
  [RuleId.PerformMultipleActions]: PerformMultipleActionsHelp,
  [RuleId.ChooseAction]: ChooseActionHelp
}
