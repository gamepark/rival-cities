/** @jsxImportSource @emotion/react */
import { HeaderText, Picture } from '@gamepark/react-game'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { isCustomMoveType } from '@gamepark/rules-api'
import { ComponentType } from 'react'
import { Trans } from 'react-i18next'
import ProductIcon from '../images/icons/Product.png'
import { AdvanceLawsuitHeader } from './AdvanceLawsuitHeader'
import { ChooseSplitActionHeader } from './ChooseSplitActionHeader'
import { ConfirmEndTurnHeader } from './ConfirmEndTurnHeader'
import { DonationHeader } from './DonationHeader'
import { GainLetterHeader } from './GainLetterHeader'
import { GainProductsHeader } from './GainProductsHeader'
import { GainStarsHeader } from './GainStarsHeader'
import { PayAlliancesUpkeepHeader } from './PayAlliancesUpkeepHeader'
import { PiracyHeader } from './PiracyHeader'
import { ProductionHeader } from './ProductionHeader'
import { RepeatActionHeader } from './RepeatActionHeader'
import { TakeBellHeader } from './TakeBellHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseStartProduct]: () => <HeaderText code="start" components={{ product: <Picture src={ProductIcon} /> }} />,
  [RuleId.AdvanceInkJar]: () => <HeaderText code="ink-jar" />,
  [RuleId.PayInkJarMovementCost]: () => <HeaderText code="ink-jar.cost" components={{ product: <Picture src={ProductIcon} /> }} />,
  [RuleId.ChooseAction]: () => <HeaderText code="choose-action" />,
  [RuleId.PlaySpecialActionCard]: () => <HeaderText code="play-card" moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />,
  [RuleId.ChooseSplitAction]: ChooseSplitActionHeader,
  [RuleId.PerformMultipleActions]: () => <HeaderText code="multiple" moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />,
  [RuleId.Production]: ProductionHeader,
  [RuleId.GainProducts]: GainProductsHeader,
  [RuleId.Donation]: DonationHeader,
  [RuleId.SwapProduct]: () => <HeaderText code="swap" moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />,
  [RuleId.GainLetter]: GainLetterHeader,
  [RuleId.DrawSpecialActionCard]: () => <HeaderText code="draw" />,
  [RuleId.BuildFactory]: () => <HeaderText code="build-factory" moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />,
  [RuleId.EarnPrestige]: () => <HeaderText code="earn-prestige" />,
  [RuleId.FormAlliance]: () => <HeaderText code="alliance" moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />,
  [RuleId.PurchaseShip]: () => <HeaderText code="ship" moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />,
  [RuleId.AdvanceLawsuit]: AdvanceLawsuitHeader,
  [RuleId.CourtRuling]: () => (
    <HeaderText code="court-ruling" moves={{ resolve: isCustomMoveType(CustomMoveType.ResolveLawsuit), pass: isCustomMoveType(CustomMoveType.Pass) }} />
  ),
  [RuleId.ResolveLawsuit]: () => <Trans defaults="header.resolve.lawsuit" />,
  [RuleId.ReactivateFactory]: () => <HeaderText code="reactivate-factory" />,
  [RuleId.Piracy]: PiracyHeader,
  [RuleId.RepeatAction]: RepeatActionHeader,
  [RuleId.GainStars]: GainStarsHeader,
  [RuleId.ConfirmEndTurn]: ConfirmEndTurnHeader,
  [RuleId.TakeBell]: TakeBellHeader,
  [RuleId.PayAlliancesUpkeep]: PayAlliancesUpkeepHeader,
  [RuleId.ReplaceSpecialActionCards]: () => <Trans defaults="header.replace-cards" />,
  [RuleId.ReactivateFactories]: () => <Trans defaults="header.reactivate-factories" />,
  [RuleId.ReturnBell]: () => <Trans defaults="header.return-bell" />
}
