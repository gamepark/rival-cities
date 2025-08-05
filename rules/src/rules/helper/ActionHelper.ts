import { MaterialGame } from '@gamepark/rules-api'
import { Action } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ActionRule } from '../actions/ActionRule'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { BuildFactoryActionRule } from '../actions/BuildFactoryActionRule'
import { ChoiceActionRule } from '../actions/ChoiceActionRule'
import { CourtRulingActionRule } from '../actions/CourtRulingActionRule'
import { DonationActionRule } from '../actions/DonationActionRule'
import { DrawSpecialActionCardActionRule } from '../actions/DrawSpecialActionCardActionRule'
import { EarnPrestigeActionRule } from '../actions/EarnPrestigeActionRule'
import { FormAllianceActionRule } from '../actions/FormAllianceActionRule'
import { GainLetterActionRule } from '../actions/GainLetterActionRule'
import { GiftActionRule } from '../actions/GiftActionRule'
import { OpponentEarnPrestigeActionRule } from '../actions/OpponentEarnPrestigeActionRule'
import { PerformMultipleActionsRule } from '../actions/PerformMultipleActionsRule'
import { PiracyActionRule } from '../actions/PiracyActionRule'
import { ProductionActionRule } from '../actions/ProductionActionRule'
import { ProductSwapActionRule } from '../actions/ProductSwapActionRule'
import { PurchaseShipActionRule } from '../actions/PurchaseShipActionRule'
import { ResolveLawsuitActionRule } from '../actions/ResolveLawsuitActionRule'
import { ReturnFactoryActionRule } from '../actions/ReturnFactoryActionRule'
import { ChooseSpecialActionRule } from '../ChooseSpecialActionRule'
import { PayToPerformActionAgainRule } from '../PayToPerformActionAgainRule'

export const getActionRule = (game: MaterialGame, action: Action): ActionRule => {
  switch (action.type) {
    case ActionType.Production:
      return new ProductionActionRule(game, action)
    case ActionType.AdvanceLawsuit:
      return new AdvanceLawsuitActionRule(game, action)
    case ActionType.BuildFactory:
      return new BuildFactoryActionRule(game, action)
    case ActionType.Donation:
      return new DonationActionRule(game, action)
    case ActionType.DrawSpecialActionCard:
      return new DrawSpecialActionCardActionRule(game, action)
    case ActionType.EarnPrestige:
      return new EarnPrestigeActionRule(game, action)
    case ActionType.OpponentEarnPrestige:
      return new OpponentEarnPrestigeActionRule(game, action)
    case ActionType.FormAlliance:
      return new FormAllianceActionRule(game, action)
    case ActionType.GainLetter:
      return new GainLetterActionRule(game, action)
    case ActionType.Gift:
      return new GiftActionRule(game, action)
    case ActionType.ProductSwap:
      return new ProductSwapActionRule(game, action)
    case ActionType.PurchaseShip:
      return new PurchaseShipActionRule(game, action)
    case ActionType.CourtRuling:
      return new CourtRulingActionRule(game, action)
    case ActionType.ReturnFactory:
      return new ReturnFactoryActionRule(game, action)
    case ActionType.Piracy:
      return new PiracyActionRule(game, action)
    case ActionType.Choice:
      return new ChoiceActionRule(game, action)
    case ActionType.Multiple:
      return new PerformMultipleActionsRule(game, action)
    case ActionType.ResolveLawsuit:
      return new ResolveLawsuitActionRule(game, action)
    case ActionType.ChooseSpecialActionCard:
      return new ChooseSpecialActionRule(game, action)
    case ActionType.PayToPerformActionAgain:
      return new PayToPerformActionAgainRule(game, action)
  }
}
