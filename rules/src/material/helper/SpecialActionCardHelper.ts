import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action, ActionType } from '../Action'
import { Product } from '../Product'
import { SpecialAction } from '../SpecialAction'

export class SpecialActionCardHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player = game.rule?.player ?? 0
  ) {
    super(game)
  }

  getCardActions(card: SpecialAction): Action[] {
    const actions = this.getCardMultipleActions(card)
    if (actions.length === 1 || card === SpecialAction.SpecialAction6 || card === SpecialAction.SpecialAction19) {
      return actions
    } else {
      return [{ type: ActionType.Multiple, actions: actions }]
    }
  }

  getCardMultipleActions(card: SpecialAction): Action[] {
    switch (card) {
      case SpecialAction.SpecialAction1:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 2
          }
        ]
      case SpecialAction.SpecialAction2:
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
      case SpecialAction.SpecialAction3:
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
      case SpecialAction.SpecialAction4:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          { type: ActionType.DrawSpecialActionCard },
          { type: ActionType.DrawSpecialActionCard }
        ]
      case SpecialAction.SpecialAction5:
        return [
          {
            type: ActionType.Piracy,
            nbProductsToSteal: 1
          }
        ]
      case SpecialAction.SpecialAction6:
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
      case SpecialAction.SpecialAction7:
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
      case SpecialAction.SpecialAction8:
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
      case SpecialAction.SpecialAction9:
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
      case SpecialAction.SpecialAction10:
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
      case SpecialAction.SpecialAction11:
        return [
          {
            type: ActionType.Production,
            quantity: 1
          }
        ]
      case SpecialAction.SpecialAction12:
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
      case SpecialAction.SpecialAction13:
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
      case SpecialAction.SpecialAction14:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.BuildFactory
          }
        ]
      case SpecialAction.SpecialAction15:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.BuildFactory
          }
        ]
      case SpecialAction.SpecialAction16:
        return [
          {
            type: ActionType.Production,
            product: Product.Furniture,
            quantity: 1
          }
        ]
      case SpecialAction.SpecialAction17:
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
      case SpecialAction.SpecialAction18:
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
      case SpecialAction.SpecialAction19:
        return [
          {
            type: ActionType.ReactivateFactory,
            count: 3
          },
          {
            type: ActionType.AdvanceLawsuit
          }
        ]
      case SpecialAction.SpecialAction20:
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
      case SpecialAction.SpecialAction21:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 2
          }
        ]
      case SpecialAction.SpecialAction22:
        return [
          {
            type: ActionType.AdvanceLawsuit
          },
          {
            type: ActionType.CourtRuling
          }
        ]
      case SpecialAction.SpecialAction23:
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
      case SpecialAction.SpecialAction24:
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
