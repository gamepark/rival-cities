import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action, ActionType } from '../Action'
import { Alliance } from '../Alliance'
import { BasicAction } from '../BasicAction'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Product } from '../Product'

export class BasicActionCardHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player = game.rule?.player ?? 0
  ) {
    super(game)
  }

  getCardAction(card: BasicAction): Action {
    switch (card) {
      case BasicAction.BasicAction1:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.Production,
              product: Product.Beer,
              quantity: 2
            },
            {
              type: ActionType.Production,
              product: Product.Cloth,
              quantity: 1
            }
          ]
        }
      case BasicAction.BasicAction2:
        return { type: ActionType.DrawSpecialActionCard }
      case BasicAction.BasicAction3:
        return {
          type: ActionType.FormAlliance
        }
      case BasicAction.BasicAction4:
        return {
          type: ActionType.BuildFactory,
          cost: 2
        }
      case BasicAction.BasicAction5:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.Production,
              product: Product.Furniture,
              quantity: 1
            },
            {
              type: ActionType.GainLetter,
              nbLettersToTake: 1
            }
          ]
        }
      case BasicAction.BasicAction6:
        return {
          type: ActionType.Production,
          product: Product.Cloth,
          quantity: 1
        }
      case BasicAction.BasicAction7:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.PurchaseShip
            },
            {
              type: ActionType.AdvanceLawsuit
            }
          ]
        }
      case BasicAction.BasicAction8:
        return {
          type: ActionType.Multiple,
          actions: [
            {
              type: ActionType.SwapProduct,
              times: 2
            },
            {
              type: ActionType.Donation,
              cost: 2,
              stars: 1,
              times: 1
            }
          ]
        }
      case BasicAction.BasicAction9:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.AdvanceLawsuit
            },
            {
              type: ActionType.Production,
              product: Product.Leather,
              quantity: 1
            }
          ]
        }
      case BasicAction.BasicAction10:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.EarnPrestige
            },
            {
              type: ActionType.FormAlliance
            }
          ]
        }
      case BasicAction.BasicAction11:
        return {
          type: ActionType.Production,
          product: Product.Leather,
          quantity: 1
        }
      case BasicAction.BasicAction12:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.GainProducts,
              quantity: 1,
              isGift: true
            },
            {
              type: ActionType.AdvanceLawsuit
            }
          ]
        }
      case BasicAction.BasicAction13:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.CourtRuling
            },
            {
              type: ActionType.PurchaseShip
            }
          ]
        }
      case BasicAction.BasicAction14:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.EarnPrestige
            },
            {
              type: ActionType.Production,
              product: Product.Beer,
              quantity: 2
            }
          ]
        }
      case BasicAction.BasicAction15:
        return {
          type: ActionType.AdvanceLawsuit
        }
    }
  }

  computeActionIfPlayerHasGdanskAlliance(): ActionType.Split | ActionType.Multiple {
    return this.checkPlayerHaveGdanskAllianceCard ? ActionType.Multiple : ActionType.Split
  }

  get checkPlayerHaveGdanskAllianceCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.player).id(Alliance.Gdansk).length > 0
  }
}
