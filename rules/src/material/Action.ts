import { Alliance } from './Alliance'
import { AnyProductsCost, ProductCost } from './Cost'
import { Product } from './Product'

export enum ActionType {
  Split = 1,
  Multiple,
  Production,
  GainProducts,
  Donation,
  SwapProduct,
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
  PlaySpecialActionCard,
  RepeatAction,
  GainStars
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

export type Production = Omit<GainProducts, 'type'> & {
  type: ActionType.Production
}

export type GainProducts = {
  type: ActionType.GainProducts
  product?: Product
  quantity: number
  isGift?: boolean
  productsGained?: Product[]
} & ActionCommon

export type Donation = {
  type: ActionType.Donation
  cost: ProductCost | AnyProductsCost
  stars: number
  times: number
} & ActionCommon

export type SwapProduct = {
  type: ActionType.SwapProduct
  times: number
  swap?: boolean
} & ActionCommon

export type GainLetter = {
  type: ActionType.GainLetter
  quantity?: number
} & ActionCommon

export type DrawSpecialActionCard = {
  type: ActionType.DrawSpecialActionCard
  isKjjobenhavnBonus?: boolean
} & ActionCommon

export type BuildFactory = {
  type: ActionType.BuildFactory
  cost?: number
  building?: boolean
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
  lawsuitIndex?: number
  count?: number
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

export type PlaySpecialActionCard = {
  type: ActionType.PlaySpecialActionCard
} & ActionCommon

export type RepeatAction = {
  type: ActionType.RepeatAction
  cost: ProductCost | AnyProductsCost
  extraAction: Action
  source?: Alliance
} & ActionCommon

export type GainStars = {
  type: ActionType.GainStars
  stars: number
} & ActionCommon

export type Action =
  | SplitAction
  | MultipleActions
  | Production
  | GainProducts
  | Donation
  | SwapProduct
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
  | PlaySpecialActionCard
  | RepeatAction
  | GainStars
