/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ComponentType } from 'react'
import { AdvanceInkJarHeader } from './AdvanceInkJarHeader'
import { AdvanceLawsuitHeader } from './AdvanceLawsuitHeader'
import { BuildFactoryHeader } from './BuildFactoryHeader'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseFirstProductHeader } from './ChooseFirstProductHeader'
import { ChooseSpecialActionHeader } from './ChooseSpecialActionHeader'
import { ChooseSplitActionHeader } from './ChooseSplitActionHeader'
import { ConfirmEndTurnHeader } from './ConfirmEndTurnHeader'
import { DrawSpecialActionCardHeader } from './DrawSpecialActionCardHeader'
import { EarnPrestigeHeader } from './EarnPrestigeHeader'
import { FormAllianceHeader } from './FormAllianceHeader'
import { GainLetterHeader } from './GainLetterHeader'
import { GiftHeader } from './GiftHeader'
import { OffSeasonChangeSpecialCardsHeader } from './OffSeasonChangeSpecialCardsHeader'
import { OffSeasonGetPrestigeBonusesHeader } from './OffSeasonGetPrestigeBonusesHeader'
import { OffSeasonGetShipsBonusesHeader } from './OffSeasonGetShipsBonusesHeader'
import { OffSeasonPayForAllianceHeader } from './OffSeasonPayForAllianceHeader'
import { OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader } from './OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader'
import { OffSeasonReactivateFactoriesHeader } from './OffSeasonReactivateFactoriesHeader'
import { OffSeasonReturnBellHeader } from './OffSeasonReturnBellHeader'
import { OffSeasonTakeBellHeader } from './OffSeasonTakeBellHeader'
import { PayProductForAdvanceHeader } from './PayProductForAdvanceHeader'
import { PayToPerformActionAgainHeader } from './PayToPerformActionAgainHeader'
import { PerformMultipleActionsHeader } from './PerformMultipleActionsHeader'
import { ProductionHeader } from './ProductionHeader'
import { ProductSwapHeader } from './ProductSwapHeader'
import { ResolveLawsuitHeader } from './ResolveLawsuitHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseFirstProduct]: ChooseFirstProductHeader,
  [RuleId.AdvanceInkJar]: AdvanceInkJarHeader,
  [RuleId.PayProductForAdvance]: PayProductForAdvanceHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.ChooseSplitAction]: ChooseSplitActionHeader,
  [RuleId.PerformMultipleActions]: PerformMultipleActionsHeader,
  [RuleId.ResolveLawsuit]: ResolveLawsuitHeader,
  [RuleId.AdvanceLawsuit]: AdvanceLawsuitHeader,
  [RuleId.DrawSpecialActionCard]: DrawSpecialActionCardHeader,
  [RuleId.EarnPrestige]: EarnPrestigeHeader,
  [RuleId.GainLetter]: GainLetterHeader,
  [RuleId.OffSeasonTakeBell]: OffSeasonTakeBellHeader,
  [RuleId.OffSeasonPayForAlliance]: OffSeasonPayForAllianceHeader,
  [RuleId.OffSeasonGetShipsBonuses]: OffSeasonGetShipsBonusesHeader,
  [RuleId.OffSeasonGetPrestigeBonuses]: OffSeasonGetPrestigeBonusesHeader,
  [RuleId.OffSeasonChangeSpecialCards]: OffSeasonChangeSpecialCardsHeader,
  [RuleId.OffSeasonReactivateFactories]: OffSeasonReactivateFactoriesHeader,
  [RuleId.OffSeasonReturnBell]: OffSeasonReturnBellHeader,
  [RuleId.ChooseSpecialAction]: ChooseSpecialActionHeader,
  [RuleId.OffSeasonPlayerWithMostShipCardsEarnPrestige]: OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader,
  [RuleId.FormAlliance]: FormAllianceHeader,
  [RuleId.BuildFactory]: BuildFactoryHeader,
  [RuleId.Production]: ProductionHeader,
  [RuleId.Gift]: GiftHeader,
  [RuleId.ProductSwap]: ProductSwapHeader,
  [RuleId.PayToPerformActionAgain]: PayToPerformActionAgainHeader,
  [RuleId.ConfirmEndTurn]: ConfirmEndTurnHeader
}
