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
import { PayProductForAdvanceHeader } from './PayProductForAdvanceHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseFirstProduct]: ChooseFirstProductHeader,
  [RuleId.AdvanceInkJar]: AdvanceInkJarHeader,
  [RuleId.PayProductForAdvance]: PayProductForAdvanceHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.BasicAction]: BasicActionHeader,
  [RuleId.AdvanceAgainInLawsuit]: AdvanceAgainInLawsuitHeader,
  [RuleId.AdvanceLawsuitAction]: AdvanceLawsuitActionHeader,
  [RuleId.DrawSpecialActionCardAction]: DrawSpecialActionCardActionHeader,
  [RuleId.EarnPrestigeAction]: EarnPrestigeActionHeader,
  [RuleId.GainLetterAction]: GainLetterActionHeader,
}
