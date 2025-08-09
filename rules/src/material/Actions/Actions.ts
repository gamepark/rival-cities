import { Product } from '../Product'
import { ActionType } from './ActionType'

type ActionCommon = {
  isRivalTurn?: boolean
}

export type ChoiceAction = {
  type: ActionType.Split
  actions: Action[]
} & ActionCommon

export type MultipleAction = {
  type: ActionType.Multiple
  actions: Action[]
} & ActionCommon

export type ProductionAction = {
  type: ActionType.Production
  productType: Product | undefined
  quantity: number
  canGetMore: boolean
} & ActionCommon

export type AdvanceLawsuitAction = {
  type: ActionType.AdvanceLawsuit
  lawsuitAdvancedLocation?: number
  nbTimeAlreadyAdvanced: number
  isLeHavreBonus?: boolean
} & ActionCommon

export type BuildFactoryAction = {
  type: ActionType.BuildFactory
  price: number
} & ActionCommon

export type DonationAction = {
  type: ActionType.Donation
  productType?: Product
  nbProduct: number
  nbStars: number
  nbTimes: number
} & ActionCommon

export type DrawSpecialActionCardAction = {
  type: ActionType.DrawSpecialActionCard
  isKjjobenhavnBonus?: boolean
} & ActionCommon

export type EarnPrestigeAction = {
  type: ActionType.EarnPrestige
  rival?: boolean
  isBruxellesBonus?: boolean
  isShip16Bonus?: boolean
} & ActionCommon

export type FormAllianceAction = {
  type: ActionType.FormAlliance
} & ActionCommon

export type GainLetterAction = {
  type: ActionType.GainLetter
  nbLettersToTake: number
} & ActionCommon

export type GiftAction = {
  type: ActionType.Gift
  productType: Product | undefined
  nbProductToTake: number
  canUseAlliance: boolean
} & ActionCommon

export type ProductSwapAction = {
  type: ActionType.ProductSwap
  nbPossibleSwaps: number
} & ActionCommon

export type PurchaseShipAction = {
  type: ActionType.PurchaseShip
} & ActionCommon

export type CourtRullingAction = {
  type: ActionType.CourtRuling
} & ActionCommon

export type ReturnFactoryAction = {
  type: ActionType.ReturnFactory
  nbFactoryCanReturn: number
} & ActionCommon

export type PiracyAction = {
  type: ActionType.Piracy
  nbProductsToSteal: number
} & ActionCommon

export type ResolveLawsuitAction = {
  type: ActionType.ResolveLawsuit
} & ActionCommon

export type ChooseSpecialActionCardAction = {
  type: ActionType.ChooseSpecialActionCard
} & ActionCommon

export type PayToPerformActionAgainAction = {
  type: ActionType.PayToPerformActionAgain
  productType: Product | undefined
  price: number
  actionToPerformAgain: Action
} & ActionCommon

export type Action =
  | ChoiceAction
  | MultipleAction
  | ProductionAction
  | AdvanceLawsuitAction
  | BuildFactoryAction
  | DonationAction
  | DrawSpecialActionCardAction
  | EarnPrestigeAction
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
