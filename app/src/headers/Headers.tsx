/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ComponentType } from 'react'
import { Trans } from 'react-i18next'
import { AdvanceInkJarHeader } from './AdvanceInkJarHeader'
import { AdvanceLawsuitHeader } from './AdvanceLawsuitHeader'
import { BuildFactoryHeader } from './BuildFactoryHeader'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseFirstProductHeader } from './ChooseFirstProductHeader'
import { ChooseSpecialActionHeader } from './ChooseSpecialActionHeader'
import { ChooseSplitActionHeader } from './ChooseSplitActionHeader'
import { ConfirmEndTurnHeader } from './ConfirmEndTurnHeader'
import { DonationHeader } from './DonationHeader'
import { DrawSpecialActionCardHeader } from './DrawSpecialActionCardHeader'
import { EarnPrestigeHeader } from './EarnPrestigeHeader'
import { FormAllianceHeader } from './FormAllianceHeader'
import { GainLetterHeader } from './GainLetterHeader'
import { GainStarsHeader } from './GainStarsHeader'
import { GiftHeader } from './GiftHeader'
import { PayAlliancesUpkeepHeader } from './PayAlliancesUpkeepHeader'
import { PayProductForAdvanceHeader } from './PayProductForAdvanceHeader'
import { PayToPerformActionAgainHeader } from './PayToPerformActionAgainHeader'
import { PerformMultipleActionsHeader } from './PerformMultipleActionsHeader'
import { PiracyHeader } from './PiracyHeader'
import { ProductionHeader } from './ProductionHeader'
import { PurchaseShipHeader } from './PurchaseShipHeader'
import { ReactivateFactoryHeader } from './ReactivateFactoryHeader'
import { ResolveLawsuitHeader } from './ResolveLawsuitHeader'
import { SwapProductHeader } from './SwapProductHeader'
import { TakeBellHeader } from './TakeBellHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseFirstProduct]: ChooseFirstProductHeader,
  [RuleId.AdvanceInkJar]: AdvanceInkJarHeader,
  [RuleId.PayInkJarMovementCost]: PayProductForAdvanceHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.ChooseSpecialAction]: ChooseSpecialActionHeader,
  [RuleId.ChooseSplitAction]: ChooseSplitActionHeader,
  [RuleId.PerformMultipleActions]: PerformMultipleActionsHeader,
  [RuleId.Production]: ProductionHeader,
  [RuleId.Gift]: GiftHeader,
  [RuleId.Donation]: DonationHeader,
  [RuleId.SwapProduct]: SwapProductHeader,
  [RuleId.GainLetter]: GainLetterHeader,
  [RuleId.DrawSpecialActionCard]: DrawSpecialActionCardHeader,
  [RuleId.BuildFactory]: BuildFactoryHeader,
  [RuleId.EarnPrestige]: EarnPrestigeHeader,
  [RuleId.FormAlliance]: FormAllianceHeader,
  [RuleId.PurchaseShip]: PurchaseShipHeader,
  [RuleId.AdvanceLawsuit]: AdvanceLawsuitHeader,
  [RuleId.ResolveLawsuit]: ResolveLawsuitHeader,
  [RuleId.ReactivateFactory]: ReactivateFactoryHeader,
  [RuleId.Piracy]: PiracyHeader,
  [RuleId.PayToPerformActionAgain]: PayToPerformActionAgainHeader,
  [RuleId.GainStars]: GainStarsHeader,
  [RuleId.ConfirmEndTurn]: ConfirmEndTurnHeader,
  [RuleId.TakeBell]: TakeBellHeader,
  [RuleId.PayAlliancesUpkeep]: PayAlliancesUpkeepHeader,
  [RuleId.ReplaceSpecialActionCards]: () => <Trans defaults="header.replace-cards" />,
  [RuleId.ReactivateFactories]: () => <Trans defaults="header.header.reactivate-factories" />,
  [RuleId.ReturnBell]: () => <Trans defaults="header.return-bell" />
}
