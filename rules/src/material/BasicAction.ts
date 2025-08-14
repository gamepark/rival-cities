import { Action, ActionType } from './Action'
import { cost } from './Cost'
import { Product } from './Product'

export enum BasicAction {
  BasicAction1 = 1,
  BasicAction2,
  BasicAction3,
  BasicAction4,
  BasicAction5,
  BasicAction6,
  BasicAction7,
  BasicAction8,
  BasicAction9,
  BasicAction10,
  BasicAction11,
  BasicAction12,
  BasicAction13,
  BasicAction14,
  BasicAction15
}

export const basicCardAction: Record<BasicAction, Action> = {
  [BasicAction.BasicAction1]: {
    type: ActionType.Split,
    actions: [
      { type: ActionType.Production, product: Product.Beer, quantity: 2 },
      { type: ActionType.Production, product: Product.Cloth, quantity: 1 }
    ]
  },
  [BasicAction.BasicAction2]: { type: ActionType.DrawSpecialActionCard },
  [BasicAction.BasicAction3]: { type: ActionType.FormAlliance },
  [BasicAction.BasicAction4]: { type: ActionType.BuildFactory, cost: 2 },
  [BasicAction.BasicAction5]: {
    type: ActionType.Split,
    actions: [{ type: ActionType.Production, product: Product.Furniture, quantity: 1 }, { type: ActionType.GainLetter }]
  },
  [BasicAction.BasicAction6]: { type: ActionType.Production, product: Product.Cloth, quantity: 1 },
  [BasicAction.BasicAction7]: {
    type: ActionType.Split,
    actions: [{ type: ActionType.PurchaseShip }, { type: ActionType.AdvanceLawsuit }]
  },
  [BasicAction.BasicAction8]: {
    type: ActionType.Multiple,
    actions: [
      { type: ActionType.SwapProduct, times: 2 },
      { type: ActionType.Donation, cost: cost(2), stars: 1, times: 1 }
    ]
  },
  [BasicAction.BasicAction9]: {
    type: ActionType.Split,
    actions: [{ type: ActionType.AdvanceLawsuit }, { type: ActionType.Production, product: Product.Leather, quantity: 1 }]
  },
  [BasicAction.BasicAction10]: {
    type: ActionType.Split,
    actions: [{ type: ActionType.EarnPrestige }, { type: ActionType.FormAlliance }]
  },
  [BasicAction.BasicAction11]: { type: ActionType.Production, product: Product.Leather, quantity: 1 },
  [BasicAction.BasicAction12]: {
    type: ActionType.Split,
    actions: [{ type: ActionType.GainProducts, quantity: 1, isGift: true }, { type: ActionType.AdvanceLawsuit }]
  },
  [BasicAction.BasicAction13]: {
    type: ActionType.Split,
    actions: [{ type: ActionType.CourtRuling }, { type: ActionType.PurchaseShip }]
  },
  [BasicAction.BasicAction14]: {
    type: ActionType.Split,
    actions: [{ type: ActionType.EarnPrestige }, { type: ActionType.Production, product: Product.Beer, quantity: 2 }]
  },
  [BasicAction.BasicAction15]: { type: ActionType.AdvanceLawsuit }
}
