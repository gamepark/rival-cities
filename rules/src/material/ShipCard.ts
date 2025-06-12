import { getEnumValues, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'
import { Product } from './Product'

export enum ShipCard {
  Ship1 = 1,
  Ship2,
  Ship3,
  Ship4,
  Ship5,
  Ship6,
  Ship7,
  Ship8,
  Ship9,
  Ship10,
  Ship11,
  Ship12,
  Ship13,
  Ship14,
  Ship15,
  Ship16,
  Ship17,
  Ship18,
  Ship19,
  Ship20,
  Ship21
}

export enum ShipEffectType {
  Instant = 1,
  OffSeason,
  OnProduction,
  Always,
  None
}

export type ShipCardData = {
  cost: {
    type: Product
    quantity: number
  }
  effect: {
    type: ShipEffectType
    rules?: RuleId[]
    action?: (game: MaterialGame, player: number) => MaterialMove[]
  }
  getNbStars: (_nbShip: number) => number
}

export const shipCards = getEnumValues(ShipCard)

export const shipCardsData: Record<ShipCard, ShipCardData> = {
  [ShipCard.Ship1]: {
    cost: { type: Product.Furniture, quantity: 3 },
    effect: { type: ShipEffectType.Instant, rules: [RuleId.EarnPrestigeAction, RuleId.EarnPrestigeAction] },
    getNbStars: () => 1
  },
  [ShipCard.Ship2]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: { type: ShipEffectType.Instant, rules: [RuleId.AdvanceLawsuitAction, RuleId.AdvanceLawsuitAction] },
    getNbStars: () => 2
  },
  [ShipCard.Ship3]: {
    cost: { type: Product.Leather, quantity: 3 },
    effect: { type: ShipEffectType.Instant, rules: [RuleId.DrawSpecialActionCardAction, RuleId.DrawSpecialActionCardAction] },
    getNbStars: () => 2
  },
  [ShipCard.Ship4]: {
    cost: { type: Product.Furniture, quantity: 2 },
    effect: { type: ShipEffectType.Instant, rules: [RuleId.GainLetterAction] },
    getNbStars: () => 3
  },
  [ShipCard.Ship5]: {
    cost: { type: Product.Furniture, quantity: 2 },
    effect: { type: ShipEffectType.Instant, rules: [RuleId.GainLetterAction, RuleId.GainLetterAction] },
    getNbStars: () => 1
  },
  [ShipCard.Ship6]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: { type: ShipEffectType.OffSeason },
    getNbStars: () => 2
  },
  [ShipCard.Ship7]: {
    cost: { type: Product.Cloth, quantity: 5 },
    effect: { type: ShipEffectType.OffSeason },
    getNbStars: () => 1
  },
  [ShipCard.Ship8]: {
    cost: { type: Product.Cloth, quantity: 4 },
    effect: { type: ShipEffectType.OffSeason },
    getNbStars: () => 1
  },
  [ShipCard.Ship9]: {
    cost: { type: Product.Beer, quantity: 5 },
    effect: { type: ShipEffectType.OffSeason },
    getNbStars: () => 2
  },
  [ShipCard.Ship10]: {
    cost: { type: Product.Beer, quantity: 5 },
    effect: { type: ShipEffectType.OffSeason },
    getNbStars: () => 1
  },
  [ShipCard.Ship11]: {
    cost: { type: Product.Cloth, quantity: 4 },
    effect: { type: ShipEffectType.OnProduction },
    getNbStars: () => 1
  },
  [ShipCard.Ship12]: {
    cost: { type: Product.Beer, quantity: 6 },
    effect: { type: ShipEffectType.OnProduction },
    getNbStars: () => 1
  },
  [ShipCard.Ship13]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: { type: ShipEffectType.OnProduction },
    getNbStars: () => 1
  },
  [ShipCard.Ship14]: {
    cost: { type: Product.Cloth, quantity: 5 },
    effect: { type: ShipEffectType.OnProduction },
    getNbStars: () => 1
  },
  [ShipCard.Ship15]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship16]: {
    cost: { type: Product.Furniture, quantity: 3 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 2
  },
  [ShipCard.Ship17]: {
    cost: { type: Product.Leather, quantity: 3 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship18]: {
    cost: { type: Product.Furniture, quantity: 4 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship19]: {
    cost: { type: Product.Beer, quantity: 4 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship20]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: { type: ShipEffectType.None },
    getNbStars: () => 5
  },
  [ShipCard.Ship21]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: { type: ShipEffectType.None },
    getNbStars: (nbShip) => nbShip
  },
}