import { ActionType } from '../../material/Action'
import { RuleId } from '../RuleId'

export const ActionRuleIds: Record<ActionType, RuleId> = {
  [ActionType.Production]: RuleId.Production,
  [ActionType.AdvanceLawsuit]: RuleId.AdvanceLawsuit,
  [ActionType.BuildFactory]: RuleId.BuildFactory,
  [ActionType.Donation]: RuleId.Donation,
  [ActionType.DrawSpecialActionCard]: RuleId.DrawSpecialActionCard,
  [ActionType.EarnPrestige]: RuleId.EarnPrestige,
  [ActionType.FormAlliance]: RuleId.FormAlliance,
  [ActionType.GainLetter]: RuleId.GainLetter,
  [ActionType.Gift]: RuleId.Gift,
  [ActionType.ProductSwap]: RuleId.ProductSwap,
  [ActionType.PurchaseShip]: RuleId.PurchaseShip,
  [ActionType.CourtRuling]: RuleId.CourtRuling,
  [ActionType.ReactivateFactory]: RuleId.ReactivateFactory,
  [ActionType.Piracy]: RuleId.Piracy,
  [ActionType.Split]: RuleId.ChooseSplitAction,
  [ActionType.Multiple]: RuleId.PerformMultipleActions,
  [ActionType.ResolveLawsuit]: RuleId.ResolveLawsuit,
  [ActionType.ChooseSpecialActionCard]: RuleId.ChooseSpecialAction,
  [ActionType.PayToPerformActionAgain]: RuleId.PayToPerformActionAgain
}
