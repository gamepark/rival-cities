import { Action, ActionType } from './Action'
import { Product } from './Product'

export enum Ship {
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
  OffSeasonBonus,
  ProductionBonus,
  WinLawsuitBonus
}

export type InstantEffect = {
  type: ShipEffectType.Instant
  actions: Action[]
}

export type OffSeasonBonusEffect = {
  type: ShipEffectType.OffSeasonBonus
  actions: Action[]
}

export type ProductionBonusEffect = {
  type: ShipEffectType.ProductionBonus
  product: Product
}

export type WinLawsuitBonusEffect = {
  type: ShipEffectType.WinLawsuitBonus
  action: Action
}

export type ShipEffect = InstantEffect | OffSeasonBonusEffect | ProductionBonusEffect | WinLawsuitBonusEffect

export type ShipData = {
  cost: {
    type: Product
    quantity: number
  }
  effect?: ShipEffect
  getNbStars: (_nbShip: number) => number
}

export const shipData: Record<Ship, ShipData> = {
  [Ship.Ship1]: {
    cost: { type: Product.Furniture, quantity: 3 },
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.EarnPrestige }, { type: ActionType.EarnPrestige }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship2]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: {
      type: ShipEffectType.Instant,
      actions: [
        { type: ActionType.AdvanceLawsuit, nbTimeAlreadyAdvanced: 0 },
        { type: ActionType.AdvanceLawsuit, nbTimeAlreadyAdvanced: 0 }
      ]
    },
    getNbStars: () => 2
  },
  [Ship.Ship3]: {
    cost: { type: Product.Leather, quantity: 3 },
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.DrawSpecialActionCard }]
    },
    getNbStars: () => 2
  },
  [Ship.Ship4]: {
    cost: { type: Product.Furniture, quantity: 2 },
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.GainLetter, nbLettersToTake: 1 }]
    },
    getNbStars: () => 3
  },
  [Ship.Ship5]: {
    cost: { type: Product.Furniture, quantity: 2 },
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.GainLetter, nbLettersToTake: 2 }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship6]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainStars, stars: 1 }]
    },
    getNbStars: () => 2
  },
  [Ship.Ship7]: {
    cost: { type: Product.Cloth, quantity: 5 },
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainProducts, product: Product.Furniture, quantity: 2 }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship8]: {
    cost: { type: Product.Cloth, quantity: 4 },
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.EarnPrestige }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship9]: {
    cost: { type: Product.Beer, quantity: 5 },
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainProducts, product: Product.Cloth, quantity: 2 }]
    },
    getNbStars: () => 2
  },
  [Ship.Ship10]: {
    cost: { type: Product.Beer, quantity: 5 },
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainLetter, nbLettersToTake: 1 }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship11]: {
    cost: { type: Product.Cloth, quantity: 4 },
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Beer
    },
    getNbStars: () => 1
  },
  [Ship.Ship12]: {
    cost: { type: Product.Beer, quantity: 6 },
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Leather
    },
    getNbStars: () => 1
  },
  [Ship.Ship13]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Cloth
    },
    getNbStars: () => 1
  },
  [Ship.Ship14]: {
    cost: { type: Product.Cloth, quantity: 5 },
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Furniture
    },
    getNbStars: () => 1
  },
  [Ship.Ship15]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: {
      type: ShipEffectType.WinLawsuitBonus,
      action: { type: ActionType.GainStars, stars: 2 }
    },
    getNbStars: () => 1
  },
  [Ship.Ship16]: {
    cost: { type: Product.Furniture, quantity: 3 },
    getNbStars: () => 2
  },
  [Ship.Ship17]: {
    cost: { type: Product.Leather, quantity: 3 },
    getNbStars: () => 1
  },
  [Ship.Ship18]: {
    cost: { type: Product.Furniture, quantity: 4 },
    getNbStars: () => 1
  },
  [Ship.Ship19]: {
    cost: { type: Product.Beer, quantity: 4 },
    getNbStars: () => 1
  },
  [Ship.Ship20]: {
    cost: { type: Product.Leather, quantity: 4 },
    getNbStars: () => 5
  },
  [Ship.Ship21]: {
    cost: { type: Product.Cloth, quantity: 3 },
    getNbStars: (nbShip) => nbShip
  }
}
