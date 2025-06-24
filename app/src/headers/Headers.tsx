/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ComponentType } from 'react'
import { AdvanceAgainInLawsuitHeader } from './AdvanceAgainInLawsuitHeader'
import { AdvanceInkJarHeader } from './AdvanceInkJarHeader'
import { AdvanceLawsuitActionHeader } from './AdvanceLawsuitActionHeader'
import { AllianceCardAdvanceAgainInLawsuitHeader } from './AllianceCardAdvanceAgainInLawsuitHeader'
import { AllianceCardDrawSpecialActionCardAgainHeader } from './AllianceCardDrawSpecialActionCardAgainHeader'
import { AllianceCardEarnPrestigeAgainHeader } from './AllianceCardEarnPrestigeAgainHeader'
import { BasicActionHeader } from './BasicActionHeader'
import { Choose1ProductHeader } from './Choose1ProductHeader'
import { Choose2ProductHeader } from './Choose2ProductHeader'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseFirstProductHeader } from './ChooseFirstProductHeader'
import { ChooseSpecialActionHeader } from './ChooseSpecialActionHeader'
import { DrawSpecialActionCardActionHeader } from './DrawSpecialActionCardActionHeader'
import { EarnPrestigeAgainHeader } from './EarnPrestigeAgainHeader'
import { EarnPrestigeHeader } from './EarnPrestigeHeader'
import { GainLetterHeader } from './GainLetterHeader'
import { OffSeasonChangeSpecialCardsHeader } from './OffSeasonChangeSpecialCardsHeader'
import { OffSeasonGetPrestigeBonusesHeader } from './OffSeasonGetPrestigeBonusesHeader'
import { OffSeasonGetShipsBonusesHeader } from './OffSeasonGetShipsBonusesHeader'
import { OffSeasonPayForAllianceHeader } from './OffSeasonPayForAllianceHeader'
import { OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader } from './OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader'
import { OffSeasonReactivateFactoriesHeader } from './OffSeasonReactivateFactoriesHeader'
import { OffSeasonReturnBellHeader } from './OffSeasonReturnBellHeader'
import { OffSeasonTakeBellHeader } from './OffSeasonTakeBellHeader'
import { PayProductForAdvanceHeader } from './PayProductForAdvanceHeader'
import { ResolveLawsuitHeader } from './ResolveLawsuitHeader'
import { SpecialActionHeader } from './SpecialActionHeader'
import { SwapProductHeader } from './SwapProductHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseFirstProduct]: ChooseFirstProductHeader,
  [RuleId.AdvanceInkJar]: AdvanceInkJarHeader,
  [RuleId.PayProductForAdvance]: PayProductForAdvanceHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.BasicAction]: BasicActionHeader,
  [RuleId.SpecialAction]: SpecialActionHeader,
  [RuleId.Choose2Product]: Choose2ProductHeader,
  [RuleId.Choose1Product]: Choose1ProductHeader,
  [RuleId.AdvanceAgainInLawsuit]: AdvanceAgainInLawsuitHeader,
  [RuleId.AllianceCardAdvanceAgainInLawsuit]: AllianceCardAdvanceAgainInLawsuitHeader,
  [RuleId.AllianceCardDrawSpecialActionCardAgain]: AllianceCardDrawSpecialActionCardAgainHeader,
  [RuleId.AllianceCardEarnPrestigeAgain]: AllianceCardEarnPrestigeAgainHeader,
  [RuleId.ResolveLawsuit]: ResolveLawsuitHeader,
  [RuleId.AdvanceLawsuitAction]: AdvanceLawsuitActionHeader,
  [RuleId.DrawSpecialActionCardAction]: DrawSpecialActionCardActionHeader,
  [RuleId.EarnPrestige]: EarnPrestigeHeader,
  [RuleId.GainLetter]: GainLetterHeader,
  [RuleId.OffSeasonTakeBell]: OffSeasonTakeBellHeader,
  [RuleId.OffSeasonPayForAlliance]: OffSeasonPayForAllianceHeader,
  [RuleId.OffSeasonGetShipsBonuses]: OffSeasonGetShipsBonusesHeader,
  [RuleId.OffSeasonGetPrestigeBonuses]: OffSeasonGetPrestigeBonusesHeader,
  [RuleId.OffSeasonChangeSpecialCards]: OffSeasonChangeSpecialCardsHeader,
  [RuleId.OffSeasonReactivateFactories]: OffSeasonReactivateFactoriesHeader,
  [RuleId.OffSeasonReturnBell]: OffSeasonReturnBellHeader,
  [RuleId.EarnPrestigeAgain]: EarnPrestigeAgainHeader,
  [RuleId.ChooseSpecialAction]: ChooseSpecialActionHeader,
  [RuleId.OffSeasonPlayerWithMostShipCardsEarnPrestige]: OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader,
  [RuleId.SwapProduct]: SwapProductHeader
}
