import { Product } from '../Product'
import { ActionType } from './ActionType'

type ActionCommon = {
  isRivalTurn?: boolean
}

export type SplitAction = {
  type: ActionType.Split
  actions: Action[]
} & ActionCommon

export type MultipleAction = {
  type: ActionType.Multiple
  actions: Action[]
} & ActionCommon

export type GainProductAction = {
  productsGained?: Product[]
} & ActionCommon

export type ProductionAction = {
  type: ActionType.Production
  productType?: Product
  quantity: number
} & GainProductAction

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
  productType?: Product
  nbProductToTake: number
  canUseAlliance: boolean
} & GainProductAction

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

export type ReactivateFactoryAction = {
  type: ActionType.ReactivateFactory
  count: number
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
  productType?: Product
  price: number
  actionToPerformAgain: Action
} & ActionCommon

export type Action =
  | SplitAction
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
  | ReactivateFactoryAction
  | PiracyAction
  | ResolveLawsuitAction
  | ChooseSpecialActionCardAction
  | PayToPerformActionAgainAction
