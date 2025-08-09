import { MaterialGame } from '@gamepark/rules-api'
import { Action, ActionType } from '../../material/Action'
import { ActionRule } from '../actions/ActionRule'
import { AdvanceLawsuitRule } from '../actions/AdvanceLawsuitRule'
import { BuildFactoryRule } from '../actions/BuildFactoryRule'
import { ChooseSplitActionRule } from '../actions/ChooseSplitActionRule'
import { CourtRulingRule } from '../actions/CourtRulingRule'
import { DonationRule } from '../actions/DonationRule'
import { DrawSpecialActionCardRule } from '../actions/DrawSpecialActionCardRule'
import { EarnPrestigeRule } from '../actions/EarnPrestigeRule'
import { FormAllianceRule } from '../actions/FormAllianceRule'
import { GainLetterRule } from '../actions/GainLetterRule'
import { GainProductsRule } from '../actions/GainProductsRule'
import { GainStarsRule } from '../actions/GainStarsRule'
import { PerformMultipleActionsRule } from '../actions/PerformMultipleActionsRule'
import { PiracyRule } from '../actions/PiracyRule'
import { ProductionRule } from '../actions/ProductionRule'
import { ProductSwapRule } from '../actions/ProductSwapRule'
import { PurchaseShipRule } from '../actions/PurchaseShipRule'
import { ReactivateFactoryRule } from '../actions/ReactivateFactoryRule'
import { ResolveLawsuitRule } from '../actions/ResolveLawsuitRule'
import { ChooseSpecialActionRule } from '../ChooseSpecialActionRule'
import { PayToPerformActionAgainRule } from '../PayToPerformActionAgainRule'

export const getActionRule = (game: MaterialGame, action: Action): ActionRule => {
  switch (action.type) {
    case ActionType.Production:
      return new ProductionRule(game, action)
    case ActionType.AdvanceLawsuit:
      return new AdvanceLawsuitRule(game, action)
    case ActionType.BuildFactory:
      return new BuildFactoryRule(game, action)
    case ActionType.Donation:
      return new DonationRule(game, action)
    case ActionType.DrawSpecialActionCard:
      return new DrawSpecialActionCardRule(game, action)
    case ActionType.EarnPrestige:
      return new EarnPrestigeRule(game, action)
    case ActionType.FormAlliance:
      return new FormAllianceRule(game, action)
    case ActionType.GainLetter:
      return new GainLetterRule(game, action)
    case ActionType.GainProducts:
      return new GainProductsRule(game, action)
    case ActionType.ProductSwap:
      return new ProductSwapRule(game, action)
    case ActionType.PurchaseShip:
      return new PurchaseShipRule(game, action)
    case ActionType.CourtRuling:
      return new CourtRulingRule(game, action)
    case ActionType.ReactivateFactory:
      return new ReactivateFactoryRule(game, action)
    case ActionType.Piracy:
      return new PiracyRule(game, action)
    case ActionType.Split:
      return new ChooseSplitActionRule(game, action)
    case ActionType.Multiple:
      return new PerformMultipleActionsRule(game, action)
    case ActionType.ResolveLawsuit:
      return new ResolveLawsuitRule(game, action)
    case ActionType.ChooseSpecialActionCard:
      return new ChooseSpecialActionRule(game, action)
    case ActionType.PayToPerformActionAgain:
      return new PayToPerformActionAgainRule(game, action)
    case ActionType.GainStars:
      return new GainStarsRule(game, action)
  }
}
