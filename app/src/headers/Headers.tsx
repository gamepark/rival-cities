/** @jsxImportSource @emotion/react */
import { AdvanceAgainInLawsuitHeader } from './AdvanceAgainInLawsuitHeader'
import { AdvanceInkJarHeader } from './AdvanceInkJarHeader'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { ComponentType } from 'react'
import { AdvanceLawsuitActionHeader } from './AdvanceLawsuitActionHeader'
import { BasicActionHeader } from './BasicActionHeader'
import { ChooseActionHeader } from './ChooseActionHeader'
import { ChooseFirstProductHeader } from './ChooseFirstProductHeader'
import { DrawSpecialActionCardActionHeader } from './DrawSpecialActionCardActionHeader'
import { EarnPrestigeActionHeader } from './EarnPrestigeActionHeader'
import { GainLetterActionHeader } from './GainLetterActionHeader'
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

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseFirstProduct]: ChooseFirstProductHeader,
  [RuleId.AdvanceInkJar]: AdvanceInkJarHeader,
  [RuleId.PayProductForAdvance]: PayProductForAdvanceHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.BasicAction]: BasicActionHeader,
  [RuleId.SpecialAction]: SpecialActionHeader,
  [RuleId.AdvanceAgainInLawsuit]: AdvanceAgainInLawsuitHeader,
  [RuleId.ResolveLawsuit]: ResolveLawsuitHeader,
  [RuleId.AdvanceLawsuitAction]: AdvanceLawsuitActionHeader,
  [RuleId.DrawSpecialActionCardAction]: DrawSpecialActionCardActionHeader,
  [RuleId.EarnPrestigeAction]: EarnPrestigeActionHeader,
  [RuleId.GainLetterAction]: GainLetterActionHeader,
  [RuleId.OffSeasonTakeBell]: OffSeasonTakeBellHeader,
  [RuleId.OffSeasonPayForAlliance]: OffSeasonPayForAllianceHeader,
  [RuleId.OffSeasonGetShipsBonuses]: OffSeasonGetShipsBonusesHeader,
  [RuleId.OffSeasonGetPrestigeBonuses]: OffSeasonGetPrestigeBonusesHeader,
  [RuleId.OffSeasonChangeSpecialCards]: OffSeasonChangeSpecialCardsHeader,
  [RuleId.OffSeasonReactivateFactories]: OffSeasonReactivateFactoriesHeader,
  [RuleId.OffSeasonReturnBell]: OffSeasonReturnBellHeader,
}
