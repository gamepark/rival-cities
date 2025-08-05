import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ChooseActionHelp } from './ChooseActionHelp'
import { ChooseSplitActionHelp } from './ChooseSplitActionHelp'
import { PayInkJarMovementCostHelp } from './PayInkJarMovementCostHelp'
import { PerformMultipleActionsHelp } from './PerformMultipleActionsHelp'

export const RulesHelp = {
  [RuleId.PayInkJarMovementCost]: PayInkJarMovementCostHelp,
  [RuleId.ChooseSplitAction]: ChooseSplitActionHelp,
  [RuleId.PerformMultipleActions]: PerformMultipleActionsHelp,
  [RuleId.ChooseAction]: ChooseActionHelp
}
