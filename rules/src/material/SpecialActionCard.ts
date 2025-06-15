import { getEnumValues } from '@gamepark/rules-api'
import { ActionType } from '../rules/ActionType'

export enum SpecialActionCard {
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

export const specialActionCards = getEnumValues(SpecialActionCard)

export const spectialActionCardActions: Record<SpecialActionCard, ActionType[]> = {
  [SpecialActionCard.SpecialAction1]: [ActionType.AdvanceLawsuit, ActionType.Gain2Letter],
  [SpecialActionCard.SpecialAction2]: [ActionType.AdvanceLawsuit, ActionType.Gift2Time],
  [SpecialActionCard.SpecialAction3]: [ActionType.AdvanceLawsuit, ActionType.PurchaseShip, ActionType.Gift],
  [SpecialActionCard.SpecialAction4]: [ActionType.AdvanceLawsuit, ActionType.Draw2SpecialActionCard],
  [SpecialActionCard.SpecialAction5]: [ActionType.Piracy],
  [SpecialActionCard.SpecialAction6]: [ActionType.OpponentEarnPrestige, ActionType.Piracy3times],
  [SpecialActionCard.SpecialAction7]: [ActionType.AdvanceLawsuit, ActionType.GiftClothes, ActionType.FormAlliance],
  [SpecialActionCard.SpecialAction8]: [ActionType.AdvanceLawsuit, ActionType.EarnPrestige, ActionType.GainLetter],
  [SpecialActionCard.SpecialAction9]: [ActionType.AdvanceLawsuit, ActionType.EarnPrestige, ActionType.GiftClothes],
  [SpecialActionCard.SpecialAction10]: [ActionType.AdvanceLawsuit, ActionType.GiftBeer, ActionType.Donation2furnituresFor3Stars],
  [SpecialActionCard.SpecialAction11]: [ActionType.Production],
  [SpecialActionCard.SpecialAction12]: [ActionType.AdvanceLawsuit, ActionType.PurchaseShip, ActionType.GiftBeer2Time],
  [SpecialActionCard.SpecialAction13]: [ActionType.AdvanceLawsuit, ActionType.GiftBeer, ActionType.Donation1ClothFor1star],
  [SpecialActionCard.SpecialAction14]: [ActionType.AdvanceLawsuit, ActionType.BuildFactory],
  [SpecialActionCard.SpecialAction15]: [ActionType.AdvanceLawsuit, ActionType.BuildFactory],
  [SpecialActionCard.SpecialAction16]: [ActionType.ProductionFurniture],
  [SpecialActionCard.SpecialAction17]: [ActionType.AdvanceLawsuit, ActionType.EarnPrestige, ActionType.GiftFurniture],
  [SpecialActionCard.SpecialAction18]: [ActionType.AdvanceLawsuit, ActionType.PurchaseShip, ActionType.GainLetter],
  [SpecialActionCard.SpecialAction19]: [ActionType.AdvanceLawsuit, ActionType.Return3Factory],
  [SpecialActionCard.SpecialAction20]: [ActionType.AdvanceLawsuit, ActionType.GiftFurniture, ActionType.FormAlliance],
  [SpecialActionCard.SpecialAction21]: [ActionType.AdvanceLawsuit, ActionType.Gain2Letter],
  [SpecialActionCard.SpecialAction22]: [ActionType.CourtRuling, ActionType.AdvanceLawsuit],
  [SpecialActionCard.SpecialAction23]: [ActionType.AdvanceLawsuit, ActionType.Gift, ActionType.Donation1LeatherFor1star2Times],
  [SpecialActionCard.SpecialAction24]: [ActionType.Gift2Time, ActionType.Donation3BeerFor1Star2Times]

}

/*
- ajouter un memoryType.CombinedActions
- alimenter ce memory suivant les actions de la carte spéciale jouée
- créer une rule SpecialActionCardRule
- instancier tout les actionRules
- mapper les actionRules par rapport aux actions dans CombinedActions
- dan les actions de base, à la fin, vérifier si CombinedActions est rempli et si oui enlever l'action sinon faire un nextRule
 */