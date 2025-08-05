import { ActionType } from '../../material/Actions/ActionType'
import { RuleId } from '../RuleId'

export const ActionRuleIds: Record<ActionType, RuleId> = {
  [ActionType.Production]: RuleId.Production,
  [ActionType.AdvanceLawsuit]: RuleId.AdvanceLawsuit,
  [ActionType.BuildFactory]: RuleId.BuildFactory,
  [ActionType.Donation]: RuleId.Donation,
  [ActionType.DrawSpecialActionCard]: RuleId.DrawSpecialActionCard,
  [ActionType.EarnPrestige]: RuleId.EarnPrestige,
  [ActionType.OpponentEarnPrestige]: RuleId.OpponentEarnPrestige,
  [ActionType.FormAlliance]: RuleId.FormAlliance,
  [ActionType.GainLetter]: RuleId.GainLetter,
  [ActionType.Gift]: RuleId.Gift,
  [ActionType.ProductSwap]: RuleId.ProductSwap,
  [ActionType.PurchaseShip]: RuleId.PurchaseShip,
  [ActionType.CourtRuling]: RuleId.CourtRuling,
  [ActionType.ReturnFactory]: RuleId.ReturnFactory,
  [ActionType.Piracy]: RuleId.Piracy,
  [ActionType.Choice]: RuleId.Choice,
  [ActionType.Multiple]: RuleId.PerformMultipleActions,
  [ActionType.ResolveLawsuit]: RuleId.ResolveLawsuit,
  [ActionType.ChooseSpecialActionCard]: RuleId.ChooseSpecialAction,
  [ActionType.PayToPerformActionAgain]: RuleId.PayToPerformActionAgain
}
