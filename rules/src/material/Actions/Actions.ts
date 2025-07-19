import { City } from '../../City'
import { Product } from '../Product'
import { ActionType } from './ActionType'

export type ChoiceAction = {
  type: ActionType.Choice
  actions: Action[]
}

export type ComputedAction = {
  type: ActionType.Computed
  actions: Action[]
  player?: City
}

export type ProductionAction = {
  type: ActionType.Production
  productType: Product | undefined
  quantity: number
}

export type AdvanceLawsuitAction = {
  type: ActionType.AdvanceLawsuit
  lawsuitAdvancedLocation?: number
  nbTimeAlreadyAdvanced: number
  playerCanUseAllianceLeHavre: boolean
}

export type BuildFactoryAction = {
  type: ActionType.BuildFactory
  price: number
}

export type DonationAction = {
  type: ActionType.Donation
  productType: Product | undefined
  nbProduct: number
  nbStars: number
  nbTimes: number
}

export type DrawSpecialActionCardAction = {
  type: ActionType.DrawSpecialActionCard
  nbCardsToDraw: number
  playerCanUseAllianceKjjobenhavn: boolean
}

export type EarnPrestigeAction = {
  type: ActionType.EarnPrestige
  playerWhoEarnedPrestige: City
  playerCanUseAllianceBruxelles: boolean
  playerCanUseShip16: boolean
}

export type OpponentEarnPrestigeAction = {
  type: ActionType.OpponentEarnPrestige
}

export type FormAllianceAction = {
  type: ActionType.FormAlliance
}

export type GainLetterAction = {
  type: ActionType.GainLetter
  nbLettersToTake: number
}

export type GiftAction = {
  type: ActionType.Gift
  productType: Product | undefined
  nbProductToTake: number
  canUseAlliance: boolean
}

export type ProductSwapAction = {
  type: ActionType.ProductSwap
  nbPossibleSwaps: number
}

export type PurchaseShipAction = {
  type: ActionType.PurchaseShip
}

export type CourtRullingAction = {
  type: ActionType.CourtRuling
}

export type ReturnFactoryAction = {
  type: ActionType.ReturnFactory
  nbFactoryCanReturn: number
}

export type PiracyAction = {
  type: ActionType.Piracy
  nbProductsToSteal: number
}

export type ResolveLawsuitAction = {
  type: ActionType.ResolveLawsuit
}

export type ChooseSpecialActionCardAction = {
  type: ActionType.ChooseSpecialActionCard
}

export type PayToPerformActionAgainAction = {
  type: ActionType.PayToPerformActionAgain
  productType: Product | undefined
  price: number
  actionToPerformAgain: Action
}

export type Action =
  | ChoiceAction
  | ComputedAction
  | ProductionAction
  | AdvanceLawsuitAction
  | BuildFactoryAction
  | DonationAction
  | DrawSpecialActionCardAction
  | EarnPrestigeAction
  | OpponentEarnPrestigeAction
  | FormAllianceAction
  | GainLetterAction
  | GiftAction
  | ProductSwapAction
  | PurchaseShipAction
  | CourtRullingAction
  | ReturnFactoryAction
  | PiracyAction
  | ResolveLawsuitAction
  | ChooseSpecialActionCardAction
  | PayToPerformActionAgainAction
