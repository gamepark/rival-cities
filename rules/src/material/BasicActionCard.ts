import { getEnumValues } from '@gamepark/rules-api'
import { ActionType } from '../rules/ActionType'

export enum BasicActionCard {
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

export const basicActionCards = getEnumValues(BasicActionCard)

export const basicActionCardActions: Record<BasicActionCard, ActionType[]> = {
  [BasicActionCard.BasicAction1]: [ActionType.ProductionBeer, ActionType.ProductionCloth],
  [BasicActionCard.BasicAction2]: [ActionType.DrawSpecialActionCard],
  [BasicActionCard.BasicAction3]: [ActionType.FormAlliance],
  [BasicActionCard.BasicAction4]: [ActionType.BuildFactory],
  [BasicActionCard.BasicAction5]: [ActionType.ProductionFurniture, ActionType.GainLetter],
  [BasicActionCard.BasicAction6]: [ActionType.ProductionCloth],
  [BasicActionCard.BasicAction7]: [ActionType.PurchaseShip, ActionType.AdvanceLawsuit],
  [BasicActionCard.BasicAction8]: [ActionType.ProductSwap, ActionType.Donation],
  [BasicActionCard.BasicAction9]: [ActionType.AdvanceLawsuit, ActionType.ProductionLeather],
  [BasicActionCard.BasicAction10]: [ActionType.EarnPrestige, ActionType.FormAlliance],
  [BasicActionCard.BasicAction11]: [ActionType.ProductionLeather],
  [BasicActionCard.BasicAction12]: [ActionType.Gift, ActionType.AdvanceLawsuit],
  [BasicActionCard.BasicAction13]: [ActionType.CourtRuling, ActionType.PurchaseShip],
  [BasicActionCard.BasicAction14]: [ActionType.EarnPrestige, ActionType.ProductionBeer],
  [BasicActionCard.BasicAction15]: [ActionType.AdvanceLawsuit],
}
