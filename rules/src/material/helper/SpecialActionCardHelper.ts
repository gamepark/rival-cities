import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action, ComputedAction } from '../Actions/Actions'
import { ActionType } from '../Actions/ActionType'
import { AllianceCard } from '../AllianceCard'
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

  getComputedAction(card: SpecialActionCard): ComputedAction {
    const action: ComputedAction = {
      type: ActionType.Computed,
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
          },
          {
            type: ActionType.DrawSpecialActionCard,
            nbCardsToDraw: 2,
            playerCanUseAllianceKjjobenhavn: this.checkPlayerHaveKjjobenhavnAllianceCard
          }
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
            type: ActionType.OpponentEarnPrestige
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
          },
          {
            type: ActionType.EarnPrestige,
            playerWhoEarnedPrestige: this.player,
            playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
            playerCanUseShip16: this.checkPlayerHaveShip16
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
          },
          {
            type: ActionType.EarnPrestige,
            playerWhoEarnedPrestige: this.player,
            playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
            playerCanUseShip16: this.checkPlayerHaveShip16
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
          },
          {
            type: ActionType.EarnPrestige,
            playerWhoEarnedPrestige: this.player,
            playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
            playerCanUseShip16: this.checkPlayerHaveShip16
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
          },
          {
            type: ActionType.CourtRuling
          }
        ]
      case SpecialActionCard.SpecialAction23:
        return [
          {
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
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

  get checkPlayerHaveLeHavreAllianceCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceLeHavre).length > 0
  }

  get checkPlayerHaveKjjobenhavnAllianceCard(): boolean {
    return (
      this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceKjjobenhavn).length > 0
    )
  }

  get checkPlayerHaveBruxellesCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceBruxelles).length > 0
  }

  get checkPlayerHaveShip16(): boolean {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship16).length > 0
  }

  get checkPlayerHaveShip19() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship19).length > 0
  }
}
