import { Product } from './Product'

export enum ActionType {
  Split = 1,
  Multiple,
  Production,
  Gift,
  Donation,
  ProductSwap,
  GainLetter,
  DrawSpecialActionCard,
  BuildFactory,
  EarnPrestige,
  FormAlliance,
  PurchaseShip,
  AdvanceLawsuit,
  CourtRuling,
  ReactivateFactory,
  Piracy,
  ResolveLawsuit,
  ChooseSpecialActionCard,
  PayToPerformActionAgain
}

type ActionCommon = {
  isRivalTurn?: boolean
}

export type SplitAction = {
  type: ActionType.Split
  actions: Action[]
} & ActionCommon

export type MultipleActions = {
  type: ActionType.Multiple
  actions: Action[]
} & ActionCommon

export type GainProducts = {
  productsGained?: Product[]
} & ActionCommon

export type Production = {
  type: ActionType.Production
  product?: Product
  quantity: number
} & GainProducts

export type Gift = {
  type: ActionType.Gift
  product?: Product
  nbProductToTake: number
  canUseAlliance: boolean
} & GainProducts

export type Donation = {
  type: ActionType.Donation
  product?: Product
  nbProduct: number
  nbStars: number
  nbTimes: number
} & ActionCommon

export type ProductSwap = {
  type: ActionType.ProductSwap
  nbPossibleSwaps: number
} & ActionCommon

export type GainLetter = {
  type: ActionType.GainLetter
  nbLettersToTake: number
} & ActionCommon

export type DrawSpecialActionCard = {
  type: ActionType.DrawSpecialActionCard
  isKjjobenhavnBonus?: boolean
} & ActionCommon

export type BuildFactory = {
  type: ActionType.BuildFactory
  price: number
} & ActionCommon

export type EarnPrestige = {
  type: ActionType.EarnPrestige
  rival?: boolean
  isBruxellesBonus?: boolean
  isShip16Bonus?: boolean
} & ActionCommon

export type FormAlliance = {
  type: ActionType.FormAlliance
} & ActionCommon

export type PurchaseShip = {
  type: ActionType.PurchaseShip
} & ActionCommon

export type AdvanceLawsuit = {
  type: ActionType.AdvanceLawsuit
  lawsuitAdvancedLocation?: number
  nbTimeAlreadyAdvanced: number
  isLeHavreBonus?: boolean
} & ActionCommon

export type CourtRuling = {
  type: ActionType.CourtRuling
} & ActionCommon

export type ReactivateFactory = {
  type: ActionType.ReactivateFactory
  count: number
} & ActionCommon

export type Piracy = {
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
  product?: Product
  price: number
  actionToPerformAgain: Action
} & ActionCommon

export type Action =
  | SplitAction
  | MultipleActions
  | Production
  | Gift
  | Donation
  | ProductSwap
  | GainLetter
  | DrawSpecialActionCard
  | BuildFactory
  | EarnPrestige
  | FormAlliance
  | PurchaseShip
  | AdvanceLawsuit
  | CourtRuling
  | ReactivateFactory
  | Piracy
  | ResolveLawsuitAction
  | ChooseSpecialActionCardAction
  | PayToPerformActionAgainAction
