import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action, MultipleAction } from '../Actions/Actions'
import { ActionType } from '../Actions/ActionType'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Product } from '../Product'
import { ShipCard } from '../ShipCard'
import { SpecialActionCard } from '../SpecialActionCard'

export class SpecialActionCardHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player = game.rule?.player ?? 0
  ) {
    super(game)
  }

  getCardAction(card: SpecialActionCard): MultipleAction {
    const action: MultipleAction = {
      type: ActionType.Multiple,
      actions: new SpecialActionCardHelper(this.game).getCardActions(card)
    }
    if (card === SpecialActionCard.SpecialAction6) {
      // TODO: handle rival prestige gain a better way?
      action.player = this.player
    }
    return action
  }

  getCardActions(card: SpecialActionCard): Action[] {
    switch (card) {
      case SpecialActionCard.SpecialAction1:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 2
          }
        ]
      case SpecialActionCard.SpecialAction2:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.Gift,
            productType: undefined,
            nbProductToTake: 2,
            canUseAlliance: true
          }
        ]
      case SpecialActionCard.SpecialAction3:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.PurchaseShip,
            playerHasShip19: this.checkPlayerHaveShip19
          },
          {
            type: ActionType.Gift,
            productType: undefined,
            nbProductToTake: 1,
            canUseAlliance: true
          }
        ]
      case SpecialActionCard.SpecialAction4:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
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
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.Gift,
            productType: Product.Cloth,
            nbProductToTake: 1,
            canUseAlliance: true
          },
          {
            type: ActionType.FormAlliance
          }
        ]
      case SpecialActionCard.SpecialAction8:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
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
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.EarnPrestige
          },
          {
            type: ActionType.Gift,
            productType: Product.Cloth,
            nbProductToTake: 1,
            canUseAlliance: true
          }
        ]
      case SpecialActionCard.SpecialAction10:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.Gift,
            productType: Product.Beer,
            nbProductToTake: 1,
            canUseAlliance: true
          },
          {
            type: ActionType.Donation,
            productType: Product.Furniture,
            nbProduct: 2,
            nbStars: 3,
            nbTimes: 1
          }
        ]
      case SpecialActionCard.SpecialAction11:
        return [
          {
            type: ActionType.Production,
            productType: undefined,
            quantity: 1,
            canGetMore: true
          }
        ]
      case SpecialActionCard.SpecialAction12:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.PurchaseShip,
            playerHasShip19: this.checkPlayerHaveShip19
          },
          {
            type: ActionType.Gift,
            productType: Product.Beer,
            nbProductToTake: 2,
            canUseAlliance: true
          }
        ]
      case SpecialActionCard.SpecialAction13:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.Gift,
            productType: Product.Beer,
            nbProductToTake: 1,
            canUseAlliance: true
          },
          {
            type: ActionType.Donation,
            productType: Product.Cloth,
            nbProduct: 1,
            nbStars: 1,
            nbTimes: 1
          }
        ]
      case SpecialActionCard.SpecialAction14:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.BuildFactory,
            price: 0
          }
        ]
      case SpecialActionCard.SpecialAction15:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.BuildFactory,
            price: 0
          }
        ]
      case SpecialActionCard.SpecialAction16:
        return [
          {
            type: ActionType.Production,
            productType: Product.Furniture,
            quantity: 1,
            canGetMore: true
          }
        ]
      case SpecialActionCard.SpecialAction17:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.EarnPrestige
          },
          {
            type: ActionType.Gift,
            productType: Product.Furniture,
            nbProductToTake: 1,
            canUseAlliance: true
          }
        ]
      case SpecialActionCard.SpecialAction18:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.PurchaseShip,
            playerHasShip19: this.checkPlayerHaveShip19
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 1
          }
        ]
      case SpecialActionCard.SpecialAction19:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.ReturnFactory,
            nbFactoryCanReturn: 3
          }
        ]
      case SpecialActionCard.SpecialAction20:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.Gift,
            productType: Product.Furniture,
            nbProductToTake: 1,
            canUseAlliance: true
          },
          {
            type: ActionType.FormAlliance
          }
        ]
      case SpecialActionCard.SpecialAction21:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.GainLetter,
            nbLettersToTake: 2
          }
        ]
      case SpecialActionCard.SpecialAction22:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.CourtRuling
          }
        ]
      case SpecialActionCard.SpecialAction23:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0
          },
          {
            type: ActionType.Gift,
            productType: undefined,
            nbProductToTake: 1,
            canUseAlliance: true
          },
          {
            type: ActionType.Donation,
            productType: Product.Leather,
            nbProduct: 1,
            nbStars: 1,
            nbTimes: 2
          }
        ]
      case SpecialActionCard.SpecialAction24:
        return [
          {
            type: ActionType.Gift,
            productType: undefined,
            nbProductToTake: 2,
            canUseAlliance: true
          },
          {
            type: ActionType.Donation,
            productType: Product.Beer,
            nbProduct: 3,
            nbStars: 1,
            nbTimes: 2
          }
        ]
    }
  }

  get checkPlayerHaveShip19() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship19).length > 0
  }
}
