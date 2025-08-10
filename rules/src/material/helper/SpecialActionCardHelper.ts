import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action, ActionType } from '../Action'
import { Product } from '../Product'
import { SpecialActionCard } from '../SpecialActionCard'

export class SpecialActionCardHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player = game.rule?.player ?? 0
  ) {
    super(game)
  }

  getCardActions(card: SpecialActionCard): Action[] {
    const actions = this.getCardMultipleActions(card)
    if (actions.length === 1 || card === SpecialActionCard.SpecialAction6 || card === SpecialActionCard.SpecialAction19) {
      return actions
    } else {
      return [{ type: ActionType.Multiple, actions: actions }]
    }
  }

  getCardMultipleActions(card: SpecialActionCard): Action[] {
    switch (card) {
      case SpecialActionCard.SpecialAction1:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 2
          }
        ]
      case SpecialActionCard.SpecialAction2:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainProducts,
            quantity: 2,
            isGift: true
          }
        ]
      case SpecialActionCard.SpecialAction3:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.PurchaseShip
          },
          {
            type: ActionType.GainProducts,
            quantity: 1,
            isGift: true
          }
        ]
      case SpecialActionCard.SpecialAction4:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          { type: ActionType.DrawSpecialActionCard },
          { type: ActionType.DrawSpecialActionCard }
        ]
      case SpecialActionCard.SpecialAction5:
        return [
          {
            type: ActionType.Piracy,
            nbProductsToSteal: 1
          }
        ]
      case SpecialActionCard.SpecialAction6:
        return [
          {
            type: ActionType.EarnPrestige,
            rival: true
          },
          {
            type: ActionType.Piracy,
            nbProductsToSteal: 3
          }
        ]
      case SpecialActionCard.SpecialAction7:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainProducts,
            product: Product.Cloth,
            quantity: 1,
            isGift: true
          },
          {
            type: ActionType.FormAlliance
          }
        ]
      case SpecialActionCard.SpecialAction8:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.EarnPrestige
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 1
          }
        ]
      case SpecialActionCard.SpecialAction9:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.EarnPrestige
          },
          {
            type: ActionType.GainProducts,
            product: Product.Cloth,
            quantity: 1,
            isGift: true
          }
        ]
      case SpecialActionCard.SpecialAction10:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainProducts,
            product: Product.Beer,
            quantity: 1,
            isGift: true
          },
          {
            type: ActionType.Donation,
            product: Product.Furniture,
            cost: 2,
            stars: 3,
            times: 1
          }
        ]
      case SpecialActionCard.SpecialAction11:
        return [
          {
            type: ActionType.Production,
            quantity: 1
          }
        ]
      case SpecialActionCard.SpecialAction12:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.PurchaseShip
          },
          {
            type: ActionType.GainProducts,
            product: Product.Beer,
            quantity: 2,
            isGift: true
          }
        ]
      case SpecialActionCard.SpecialAction13:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainProducts,
            product: Product.Beer,
            quantity: 1,
            isGift: true
          },
          {
            type: ActionType.Donation,
            product: Product.Cloth,
            cost: 1,
            stars: 1,
            times: 1
          }
        ]
      case SpecialActionCard.SpecialAction14:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.BuildFactory
          }
        ]
      case SpecialActionCard.SpecialAction15:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.BuildFactory
          }
        ]
      case SpecialActionCard.SpecialAction16:
        return [
          {
            type: ActionType.Production,
            product: Product.Furniture,
            quantity: 1
          }
        ]
      case SpecialActionCard.SpecialAction17:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.EarnPrestige
          },
          {
            type: ActionType.GainProducts,
            product: Product.Furniture,
            quantity: 1,
            isGift: true
          }
        ]
      case SpecialActionCard.SpecialAction18:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.PurchaseShip
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 1
          }
        ]
      case SpecialActionCard.SpecialAction19:
        return [
          {
            type: ActionType.ReactivateFactory,
            count: 3
          },
          {
            type: ActionType.AdvanceLawsuit
          }
        ]
      case SpecialActionCard.SpecialAction20:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainProducts,
            product: Product.Furniture,
            quantity: 1,
            isGift: true
          },
          {
            type: ActionType.FormAlliance
          }
        ]
      case SpecialActionCard.SpecialAction21:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 2
          }
        ]
      case SpecialActionCard.SpecialAction22:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.CourtRuling
          }
        ]
      case SpecialActionCard.SpecialAction23:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainProducts,
            quantity: 1,
            isGift: true
          },
          {
            type: ActionType.Donation,
            product: Product.Leather,
            cost: 1,
            stars: 1,
            times: 2
          }
        ]
      case SpecialActionCard.SpecialAction24:
        return [
          {
            type: ActionType.GainProducts,
            quantity: 2,
            isGift: true
          },
          {
            type: ActionType.Donation,
            product: Product.Beer,
            cost: 3,
            stars: 1,
            times: 2
          }
        ]
    }
  }
}
