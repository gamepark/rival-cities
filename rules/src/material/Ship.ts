import { Action, ActionType } from './Action'
import { cost, ProductCost } from './Cost'
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
  cost: ProductCost
  effect?: ShipEffect
  getNbStars: (_nbShip: number) => number
}

export const shipData: Record<Ship, ShipData> = {
  [Ship.Ship1]: {
    cost: cost(3, Product.Furniture),
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.EarnPrestige }, { type: ActionType.EarnPrestige }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship2]: {
    cost: cost(3, Product.Cloth),
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.AdvanceLawsuit }, { type: ActionType.AdvanceLawsuit }]
    },
    getNbStars: () => 2
  },
  [Ship.Ship3]: {
    cost: cost(3, Product.Leather),
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.DrawSpecialActionCard }]
    },
    getNbStars: () => 2
  },
  [Ship.Ship4]: {
    cost: cost(2, Product.Furniture),
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.GainLetter, nbLettersToTake: 1 }]
    },
    getNbStars: () => 3
  },
  [Ship.Ship5]: {
    cost: cost(2, Product.Furniture),
    effect: {
      type: ShipEffectType.Instant,
      actions: [{ type: ActionType.GainLetter, nbLettersToTake: 2 }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship6]: {
    cost: cost(4, Product.Leather),
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainStars, stars: 1 }]
    },
    getNbStars: () => 2
  },
  [Ship.Ship7]: {
    cost: cost(5, Product.Cloth),
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainProducts, product: Product.Furniture, quantity: 2 }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship8]: {
    cost: cost(4, Product.Cloth),
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.EarnPrestige }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship9]: {
    cost: cost(5, Product.Beer),
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainProducts, product: Product.Cloth, quantity: 2 }]
    },
    getNbStars: () => 2
  },
  [Ship.Ship10]: {
    cost: cost(5, Product.Beer),
    effect: {
      type: ShipEffectType.OffSeasonBonus,
      actions: [{ type: ActionType.GainLetter, nbLettersToTake: 1 }]
    },
    getNbStars: () => 1
  },
  [Ship.Ship11]: {
    cost: cost(4, Product.Cloth),
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Beer
    },
    getNbStars: () => 1
  },
  [Ship.Ship12]: {
    cost: cost(6, Product.Beer),
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Leather
    },
    getNbStars: () => 1
  },
  [Ship.Ship13]: {
    cost: cost(4, Product.Leather),
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Cloth
    },
    getNbStars: () => 1
  },
  [Ship.Ship14]: {
    cost: cost(5, Product.Cloth),
    effect: {
      type: ShipEffectType.ProductionBonus,
      product: Product.Furniture
    },
    getNbStars: () => 1
  },
  [Ship.Ship15]: {
    cost: cost(3, Product.Cloth),
    effect: {
      type: ShipEffectType.WinLawsuitBonus,
      action: { type: ActionType.GainStars, stars: 2 }
    },
    getNbStars: () => 1
  },
  [Ship.Ship16]: {
    cost: cost(3, Product.Furniture),
    getNbStars: () => 2
  },
  [Ship.Ship17]: {
    cost: cost(3, Product.Leather),
    getNbStars: () => 1
  },
  [Ship.Ship18]: {
    cost: cost(4, Product.Furniture),
    getNbStars: () => 1
  },
  [Ship.Ship19]: {
    cost: cost(4, Product.Beer),
    getNbStars: () => 1
  },
  [Ship.Ship20]: {
    cost: cost(4, Product.Leather),
    getNbStars: () => 5
  },
  [Ship.Ship21]: {
    cost: cost(3, Product.Cloth),
    getNbStars: (nbShip) => nbShip
  }
}
