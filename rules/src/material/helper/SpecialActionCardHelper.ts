import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { ComputedAction } from '../Actions/Actions'
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

  specialActionCardActions: Record<SpecialActionCard, ComputedAction> = {
    [SpecialActionCard.SpecialAction1]: {
      type: ActionType.Computed,
      actions: [
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
    },
    [SpecialActionCard.SpecialAction2]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.Gift,
          productType: undefined,
          nbProductToTake: 2
        }
      ]
    },
    [SpecialActionCard.SpecialAction3]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.PurchaseShip
        },
        {
          type: ActionType.Gift,
          productType: undefined,
          nbProductToTake: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction4]: {
      type: ActionType.Computed,
      actions: [
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
    },
    [SpecialActionCard.SpecialAction5]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.Piracy,
          nbProductsToSteal: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction6]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.OpponentEarnPrestige
        },
        {
          type: ActionType.Piracy,
          nbProductsToSteal: 3
        }
      ],
      player: this.player
    },
    [SpecialActionCard.SpecialAction7]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.Gift,
          productType: Product.Cloth,
          nbProductToTake: 1
        },
        {
          type: ActionType.FormAlliance
        }
      ]
    },
    [SpecialActionCard.SpecialAction8]: {
      type: ActionType.Computed,
      actions: [
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
    },
    [SpecialActionCard.SpecialAction9]: {
      type: ActionType.Computed,
      actions: [
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
          nbProductToTake: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction10]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.Gift,
          productType: Product.Beer,
          nbProductToTake: 1
        },
        {
          type: ActionType.Donation,
          productType: Product.Furniture,
          nbProduct: 2,
          nbStars: 3,
          nbTimes: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction11]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.Production,
          productType: undefined,
          quantity: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction12]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.PurchaseShip
        },
        {
          type: ActionType.Gift,
          productType: Product.Beer,
          nbProductToTake: 2
        }
      ]
    },
    [SpecialActionCard.SpecialAction13]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.Gift,
          productType: Product.Beer,
          nbProductToTake: 1
        },
        {
          type: ActionType.Donation,
          productType: Product.Cloth,
          nbProduct: 1,
          nbStars: 1,
          nbTimes: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction14]: {
      type: ActionType.Computed,
      actions: [
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
    },
    [SpecialActionCard.SpecialAction15]: {
      type: ActionType.Computed,
      actions: [
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
    },
    [SpecialActionCard.SpecialAction16]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.Production,
          productType: Product.Furniture,
          quantity: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction17]: {
      type: ActionType.Computed,
      actions: [
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
          nbProductToTake: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction18]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.PurchaseShip
        },
        {
          type: ActionType.GainLetter,
          nbLettersToTake: 1
        }
      ]
    },
    [SpecialActionCard.SpecialAction19]: {
      type: ActionType.Computed,
      actions: [
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
    },
    [SpecialActionCard.SpecialAction20]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.Gift,
          productType: Product.Furniture,
          nbProductToTake: 1
        },
        {
          type: ActionType.FormAlliance
        }
      ]
    },
    [SpecialActionCard.SpecialAction21]: {
      type: ActionType.Computed,
      actions: [
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
    },
    [SpecialActionCard.SpecialAction22]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.CourtRuling
        }
      ]
    },
    [SpecialActionCard.SpecialAction23]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.Gift,
          productType: undefined,
          nbProductToTake: 1
        },
        {
          type: ActionType.Donation,
          productType: Product.Leather,
          nbProduct: 1,
          nbStars: 1,
          nbTimes: 2
        }
      ]
    },
    [SpecialActionCard.SpecialAction24]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.Gift,
          productType: undefined,
          nbProductToTake: 2
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
}
