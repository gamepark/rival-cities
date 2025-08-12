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
import { CourtRulingHeader } from './CourtRulingHeader'
import { DonationHeader } from './DonationHeader'
import { EarnPrestigeHeader } from './EarnPrestigeHeader'
import { FormAllianceHeader } from './FormAllianceHeader'
import { GainLetterHeader } from './GainLetterHeader'
import { GainProductsHeader } from './GainProductsHeader'
import { GainStarsHeader } from './GainStarsHeader'
import { PayAlliancesUpkeepHeader } from './PayAlliancesUpkeepHeader'
import { PayToPerformActionAgainHeader } from './PayToPerformActionAgainHeader'
import { PiracyHeader } from './PiracyHeader'
import { ProductionHeader } from './ProductionHeader'
import { PurchaseShipHeader } from './PurchaseShipHeader'
import { ReactivateFactoryHeader } from './ReactivateFactoryHeader'
import { ResolveLawsuitHeader } from './ResolveLawsuitHeader'
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
  [RuleId.EarnPrestige]: EarnPrestigeHeader,
  [RuleId.FormAlliance]: FormAllianceHeader,
  [RuleId.PurchaseShip]: PurchaseShipHeader,
  [RuleId.AdvanceLawsuit]: AdvanceLawsuitHeader,
  [RuleId.CourtRuling]: CourtRulingHeader,
  [RuleId.ResolveLawsuit]: ResolveLawsuitHeader,
  [RuleId.ReactivateFactory]: ReactivateFactoryHeader,
  [RuleId.Piracy]: PiracyHeader,
  [RuleId.PayToPerformActionAgain]: PayToPerformActionAgainHeader,
  [RuleId.GainStars]: GainStarsHeader,
  [RuleId.ConfirmEndTurn]: ConfirmEndTurnHeader,
  [RuleId.TakeBell]: TakeBellHeader,
  [RuleId.PayAlliancesUpkeep]: PayAlliancesUpkeepHeader,
  [RuleId.ReplaceSpecialActionCards]: () => <Trans defaults="header.replace-cards" />,
  [RuleId.ReactivateFactories]: () => <Trans defaults="header.reactivate-factories" />,
  [RuleId.ReturnBell]: () => <Trans defaults="header.return-bell" />
}
