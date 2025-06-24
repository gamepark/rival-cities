import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { BasicActionsHelp } from './BasicActionsHelp'
import { SpecialActionsHelp } from './SpecialActionsHelp'

export const RulesHelp = {
  [RuleId.BasicAction]: BasicActionsHelp,
  [RuleId.SpecialAction]: SpecialActionsHelp
}
