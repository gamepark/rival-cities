import { Action, ActionType } from './Action'
import { cost, Cost, CostType } from './Cost'
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
  cost: Cost
  advanceBonus: Action[]
  winBonus: Action[]
  nbStars: number
}

export const lawsuitData: Record<Lawsuit, LawsuitData> = {
  [Lawsuit.Lawsuit1]: {
    cost: cost(1, Product.Cloth),
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Leather, quantity: 1 }],
    winBonus: [{ type: ActionType.GainProducts, product: Product.Leather, quantity: 3 }, { type: ActionType.EarnPrestige }],
    nbStars: 1
  },
  [Lawsuit.Lawsuit2]: {
    cost: cost(1, Product.Leather),
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Furniture, quantity: 1 }],
    winBonus: [{ type: ActionType.BuildFactory }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit3]: {
    cost: cost(1, Product.Furniture),
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Cloth, quantity: 1 }],
    winBonus: [{ type: ActionType.GainProducts, quantity: 2 }],
    nbStars: 3
  },
  [Lawsuit.Lawsuit4]: {
    cost: { type: CostType.Letters, amount: 1 },
    advanceBonus: [{ type: ActionType.EarnPrestige }],
    winBonus: [{ type: ActionType.BuildFactory }],
    nbStars: 4
  },
  [Lawsuit.Lawsuit5]: {
    cost: cost(1, Product.Leather),
    advanceBonus: [{ type: ActionType.ReactivateFactory, count: 2 }],
    winBonus: [
      { type: ActionType.GainProducts, product: Product.Beer, quantity: 3 },
      { type: ActionType.GainStars, stars: 2 }
    ],
    nbStars: 2
  },
  [Lawsuit.Lawsuit6]: {
    cost: cost(1, Product.Furniture),
    advanceBonus: [{ type: ActionType.EarnPrestige }],
    winBonus: [{ type: ActionType.GainLetter, quantity: 2 }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit7]: {
    cost: cost(1, Product.Cloth),
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Beer, quantity: 1 }],
    winBonus: [{ type: ActionType.EarnPrestige }, { type: ActionType.GainProducts, quantity: 1 }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit8]: {
    cost: { type: CostType.Products, amount: { [Product.Cloth]: 1, [Product.Leather]: 1 } },
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Beer, quantity: 1 }, { type: ActionType.GainLetter }],
    winBonus: [{ type: ActionType.BuildFactory }],
    nbStars: 3
  },
  [Lawsuit.Lawsuit9]: {
    cost: cost(1, Product.Leather),
    advanceBonus: [{ type: ActionType.EarnPrestige }],
    winBonus: [{ type: ActionType.GainLetter }],
    nbStars: 2
  },
  [Lawsuit.Lawsuit10]: {
    cost: cost(2, Product.Beer),
    advanceBonus: [{ type: ActionType.GainProducts, product: Product.Cloth, quantity: 1 }],
    winBonus: [{ type: ActionType.BuildFactory }],
    nbStars: 2
  }
}
