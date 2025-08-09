import { Action, ActionType } from './Action'
import { Product } from './Product'

export enum Lawsuit {
  Lawsuit1 = 1,
  Lawsuit2,
  Lawsuit3,
  Lawsuit4,
  Lawsuit5,
  Lawsuit6,
  Lawsuit7,
  Lawsuit8,
  Lawsuit9,
  Lawsuit10
}

export type LawsuitData = {
  cost: {
    type: Product | 'Letter'
    quantity: number
  }[]
  advanceBonus: Action[]
  winBonus: Action[]
  nbStars: number
}

export const lawsuitData: Record<Lawsuit, LawsuitData> = {
  [Lawsuit.Lawsuit1]: {
    cost: [{ type: Product.Cloth, quantity: 1 }],
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Leather, quantity: 1 }],
    winBonus: [{ type: ActionType.GainProducts, product: Product.Leather, quantity: 3 }, { type: ActionType.EarnPrestige }],
    nbStars: 1
  },
  [Lawsuit.Lawsuit2]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Furniture, quantity: 1 }],
    winBonus: [{ type: ActionType.BuildFactory, price: 0 }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit3]: {
    cost: [{ type: Product.Furniture, quantity: 1 }],
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Cloth, quantity: 1 }],
    winBonus: [{ type: ActionType.GainProducts, quantity: 2 }],
    nbStars: 3
  },
  [Lawsuit.Lawsuit4]: {
    cost: [{ type: 'Letter', quantity: 1 }],
    advanceBonus: [{ type: ActionType.EarnPrestige }],
    winBonus: [{ type: ActionType.BuildFactory, price: 0 }],
    nbStars: 4
  },
  [Lawsuit.Lawsuit5]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    advanceBonus: [{ type: ActionType.ReactivateFactory, count: 2 }],
    winBonus: [
      { type: ActionType.GainProducts, product: Product.Beer, quantity: 3 },
      { type: ActionType.GainStars, stars: 2 }
    ],
    nbStars: 2
  },
  [Lawsuit.Lawsuit6]: {
    cost: [{ type: Product.Furniture, quantity: 1 }],
    advanceBonus: [{ type: ActionType.EarnPrestige }],
    winBonus: [{ type: ActionType.GainLetter, nbLettersToTake: 2 }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit7]: {
    cost: [{ type: Product.Cloth, quantity: 1 }],
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Beer, quantity: 1 }],
    winBonus: [{ type: ActionType.EarnPrestige }, { type: ActionType.GainProducts, quantity: 1 }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit8]: {
    cost: [
      { type: Product.Cloth, quantity: 1 },
      { type: Product.Leather, quantity: 1 }
    ],
    advanceBonus: [
      { type: ActionType.GainProducts, product: Product.Beer, quantity: 1 },
      { type: ActionType.GainLetter, nbLettersToTake: 1 }
    ],
    winBonus: [{ type: ActionType.BuildFactory, price: 0 }],
    nbStars: 3
  },
  [Lawsuit.Lawsuit9]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    advanceBonus: [{ type: ActionType.EarnPrestige }],
    winBonus: [{ type: ActionType.GainLetter, nbLettersToTake: 1 }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit10]: {
    cost: [{ type: Product.Beer, quantity: 2 }],
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Cloth, quantity: 1 }],
    winBonus: [{ type: ActionType.BuildFactory, price: 0 }],
    nbStars: 2
  }
}
