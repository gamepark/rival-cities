import { ActionType } from '../../material/Action'
import { RuleId } from '../RuleId'

export const ActionRuleIds: Record<ActionType, RuleId> = {
  [ActionType.Split]: RuleId.ChooseSplitAction,
  [ActionType.Multiple]: RuleId.PerformMultipleActions,
  [ActionType.Production]: RuleId.Production,
  [ActionType.GainProducts]: RuleId.GainProducts,
  [ActionType.Donation]: RuleId.Donation,
  [ActionType.SwapProduct]: RuleId.SwapProduct,
  [ActionType.GainLetter]: RuleId.GainLetter,
  [ActionType.DrawSpecialActionCard]: RuleId.DrawSpecialActionCard,
  [ActionType.BuildFactory]: RuleId.BuildFactory,
  [ActionType.EarnPrestige]: RuleId.EarnPrestige,
  [ActionType.FormAlliance]: RuleId.FormAlliance,
  [ActionType.PurchaseShip]: RuleId.PurchaseShip,
  [ActionType.AdvanceLawsuit]: RuleId.AdvanceLawsuit,
  [ActionType.CourtRuling]: RuleId.CourtRuling,
  [ActionType.ReactivateFactory]: RuleId.ReactivateFactory,
  [ActionType.Piracy]: RuleId.Piracy,
  [ActionType.ResolveLawsuit]: RuleId.ResolveLawsuit,
  [ActionType.PlaySpecialActionCard]: RuleId.PlaySpecialActionCard,
  [ActionType.RepeatAction]: RuleId.RepeatAction,
  [ActionType.GainStars]: RuleId.GainStars
}
