/** @jsxImportSource @emotion/react */
import { AdvanceAgainInLawsuitHeader } from './AdvanceAgainInLawsuitHeader'
import { AdvanceInkJarHeader } from './AdvanceInkJarHeader'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ComponentType } from 'react'
import { AdvanceLawsuitActionHeader } from './AdvanceLawsuitActionHeader'
import { BasicActionHeader } from './BasicActionHeader'
import { Choose1ProductHeader } from './Choose1ProductHeader'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseFirstProductHeader } from './ChooseFirstProductHeader'
import { ChooseSpecialActionHeader } from './ChooseSpecialActionHeader'
import { DrawSpecialActionCardActionHeader } from './DrawSpecialActionCardActionHeader'
import { EarnPrestigeActionHeader } from './EarnPrestigeActionHeader'
import { GainLetterHeader } from './GainLetterHeader'
import { OffSeasonChangeSpecialCardsHeader } from './OffSeasonChangeSpecialCardsHeader'
import { OffSeasonReactivateFactoriesHeader } from './OffSeasonReactivateFactoriesHeader'
import { OffSeasonReturnBellHeader } from './OffSeasonReturnBellHeader'
import { OffSeasonTakeBellHeader } from './OffSeasonTakeBellHeader'
import { PayProductForAdvanceHeader } from './PayProductForAdvanceHeader'
import { ResolveLawsuitHeader } from './ResolveLawsuitHeader'
import { SpecialActionHeader } from './SpecialActionHeader'
import { OffSeasonPayForAllianceHeader } from './OffSeasonPayForAllianceHeader'
import { OffSeasonGetShipsBonusesHeader } from './OffSeasonGetShipsBonusesHeader'
import { OffSeasonGetPrestigeBonusesHeader } from './OffSeasonGetPrestigeBonusesHeader'
import { EarnPrestigeAgainHeader } from './EarnPrestigeAgainHeader'
import { Choose2ProductHeader } from './Choose2ProductHeader'
import { OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader } from './OffSeasonPlayerWithMostShipCardsEarnPrestigeHeader'
import { AllianceCardAdvanceAgainInLawsuitHeader } from './AllianceCardAdvanceAgainInLawsuitHeader'
import { AllianceCardDrawSpecialActionCardAgainHeader } from './AllianceCardDrawSpecialActionCardAgainHeader'
import { AllianceCardEarnPrestigeAgainHeader } from './AllianceCardEarnPrestigeAgainHeader'

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
  [RuleId.EarnPrestigeAction]: EarnPrestigeActionHeader,
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
}
