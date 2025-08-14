import { Action, ActionType } from './Action'
import { cost } from './Cost'
import { Product } from './Product'

export enum SpecialAction {
  SpecialAction1 = 1,
  SpecialAction2,
  SpecialAction3,
  SpecialAction4,
  SpecialAction5,
  SpecialAction6,
  SpecialAction7,
  SpecialAction8,
  SpecialAction9,
  SpecialAction10,
  SpecialAction11,
  SpecialAction12,
  SpecialAction13,
  SpecialAction14,
  SpecialAction15,
  SpecialAction16,
  SpecialAction17,
  SpecialAction18,
  SpecialAction19,
  SpecialAction20,
  SpecialAction21,
  SpecialAction22,
  SpecialAction23,
  SpecialAction24
}

const multipleAction = (...actions: Action[]): Action[] => [{ type: ActionType.Multiple, actions }]

export const specialCardActions: Record<SpecialAction, Action[]> = {
  [SpecialAction.SpecialAction1]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.GainLetter, quantity: 2 }),
  [SpecialAction.SpecialAction2]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.GainProducts, quantity: 2, isGift: true }),
  [SpecialAction.SpecialAction3]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.PurchaseShip },
    { type: ActionType.GainProducts, quantity: 1, isGift: true }
  ),
  [SpecialAction.SpecialAction4]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.DrawSpecialActionCard },
    { type: ActionType.DrawSpecialActionCard }
  ),
  [SpecialAction.SpecialAction5]: [{ type: ActionType.Piracy, nbProductsToSteal: 1 }],
  [SpecialAction.SpecialAction6]: [
    { type: ActionType.EarnPrestige, rival: true },
    { type: ActionType.Piracy, nbProductsToSteal: 3 }
  ],
  [SpecialAction.SpecialAction7]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.GainProducts, product: Product.Cloth, quantity: 1, isGift: true },
    { type: ActionType.FormAlliance }
  ),
  [SpecialAction.SpecialAction8]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.EarnPrestige }, { type: ActionType.GainLetter }),
  [SpecialAction.SpecialAction9]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.EarnPrestige },
    { type: ActionType.GainProducts, product: Product.Cloth, quantity: 1, isGift: true }
  ),
  [SpecialAction.SpecialAction10]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.GainProducts, product: Product.Beer, quantity: 1, isGift: true },
    { type: ActionType.Donation, cost: cost(2, Product.Furniture), stars: 3, times: 1 }
  ),
  [SpecialAction.SpecialAction11]: [{ type: ActionType.Production, quantity: 1 }],
  [SpecialAction.SpecialAction12]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.PurchaseShip },
    { type: ActionType.GainProducts, product: Product.Beer, quantity: 2, isGift: true }
  ),
  [SpecialAction.SpecialAction13]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.GainProducts, product: Product.Beer, quantity: 1, isGift: true },
    { type: ActionType.Donation, cost: cost(1, Product.Cloth), stars: 1, times: 1 }
  ),
  [SpecialAction.SpecialAction14]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.BuildFactory }),
  [SpecialAction.SpecialAction15]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.BuildFactory }),
  [SpecialAction.SpecialAction16]: [{ type: ActionType.Production, product: Product.Furniture, quantity: 1 }],
  [SpecialAction.SpecialAction17]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.EarnPrestige },
    { type: ActionType.GainProducts, product: Product.Furniture, quantity: 1, isGift: true }
  ),
  [SpecialAction.SpecialAction18]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.PurchaseShip }, { type: ActionType.GainLetter }),
  [SpecialAction.SpecialAction19]: [{ type: ActionType.ReactivateFactory, count: 3 }, { type: ActionType.AdvanceLawsuit }],
  [SpecialAction.SpecialAction20]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.GainProducts, product: Product.Furniture, quantity: 1, isGift: true },
    { type: ActionType.FormAlliance }
  ),
  [SpecialAction.SpecialAction21]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.GainLetter, quantity: 2 }),
  [SpecialAction.SpecialAction22]: multipleAction({ type: ActionType.AdvanceLawsuit }, { type: ActionType.CourtRuling }),
  [SpecialAction.SpecialAction23]: multipleAction(
    { type: ActionType.AdvanceLawsuit },
    { type: ActionType.GainProducts, quantity: 1, isGift: true },
    { type: ActionType.Donation, cost: cost(1, Product.Leather), stars: 1, times: 2 }
  ),
  [SpecialAction.SpecialAction24]: multipleAction(
    { type: ActionType.GainProducts, quantity: 2, isGift: true },
    { type: ActionType.Donation, cost: cost(3, Product.Beer), stars: 1, times: 2 }
  )
}
