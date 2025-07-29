import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action } from '../Actions/Actions'
import { ActionType } from '../Actions/ActionType'
import { AllianceCard } from '../AllianceCard'
import { BasicActionCard } from '../BasicActionCard'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Product } from '../Product'
import { ShipCard } from '../ShipCard'

export class BasicActionCardHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player = game.rule?.player ?? 0
  ) {
    super(game)
  }

  basicActionCardActions: Record<BasicActionCard, Action> = {
    [BasicActionCard.BasicAction1]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.Production,
          productType: Product.Beer,
          quantity: 2,
          canGetMore: true
        },
        {
          type: ActionType.Production,
          productType: Product.Cloth,
          quantity: 1,
          canGetMore: true
        }
      ]
    },
    [BasicActionCard.BasicAction2]: {
      type: ActionType.DrawSpecialActionCard,
      nbCardsToDraw: 1,
      playerCanUseAllianceKjjobenhavn: this.checkPlayerHaveKjjobenhavnAllianceCard
    },
    [BasicActionCard.BasicAction3]: {
      type: ActionType.FormAlliance
    },
    [BasicActionCard.BasicAction4]: {
      type: ActionType.BuildFactory,
      price: 2
    },
    [BasicActionCard.BasicAction5]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.Production,
          productType: Product.Furniture,
          quantity: 1,
          canGetMore: true
        },
        {
          type: ActionType.GainLetter,
          nbLettersToTake: 1
        }
      ]
    },
    [BasicActionCard.BasicAction6]: {
      type: ActionType.Production,
      productType: Product.Cloth,
      quantity: 1,
      canGetMore: true
    },
    [BasicActionCard.BasicAction7]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.PurchaseShip,
          playerHasShip19: this.checkPlayerHaveShip19
        },
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        }
      ]
    },
    [BasicActionCard.BasicAction8]: {
      type: ActionType.Computed,
      actions: [
        {
          type: ActionType.ProductSwap,
          nbPossibleSwaps: 2
        },
        {
          type: ActionType.Donation,
          productType: undefined,
          nbProduct: 2,
          nbTimes: 1,
          nbStars: 1
        }
      ]
    },
    [BasicActionCard.BasicAction9]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        },
        {
          type: ActionType.Production,
          productType: Product.Leather,
          quantity: 1,
          canGetMore: true
        }
      ]
    },
    [BasicActionCard.BasicAction10]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.EarnPrestige,
          playerWhoEarnedPrestige: this.player,
          playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
          playerCanUseShip16: this.checkPlayerHaveShip16
        },
        {
          type: ActionType.FormAlliance
        }
      ]
    },
    [BasicActionCard.BasicAction11]: {
      type: ActionType.Production,
      productType: Product.Leather,
      quantity: 1,
      canGetMore: true
    },
    [BasicActionCard.BasicAction12]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.Gift,
          nbProductToTake: 1,
          productType: undefined,
          canUseAlliance: true
        },
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0,
          playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
        }
      ]
    },
    [BasicActionCard.BasicAction13]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.CourtRuling
        },
        {
          type: ActionType.PurchaseShip,
          playerHasShip19: this.checkPlayerHaveShip19
        }
      ]
    },
    [BasicActionCard.BasicAction14]: {
      type: this.computeActionIfPlayerHasGdanskAlliance(),
      actions: [
        {
          type: ActionType.EarnPrestige,
          playerWhoEarnedPrestige: this.player,
          playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
          playerCanUseShip16: this.checkPlayerHaveShip16
        },
        {
          type: ActionType.Production,
          productType: Product.Beer,
          quantity: 2,
          canGetMore: true
        }
      ]
    },
    [BasicActionCard.BasicAction15]: {
      type: ActionType.AdvanceLawsuit,
      nbTimeAlreadyAdvanced: 0,
      playerCanUseAllianceLeHavre: this.checkPlayerHaveLeHavreAllianceCard
    }
  }

  computeActionIfPlayerHasGdanskAlliance(): ActionType.Choice | ActionType.Computed {
    return this.checkPlayerHaveGdansAllianceCard ? ActionType.Computed : ActionType.Choice
  }

  get checkPlayerHaveGdansAllianceCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceGdansk).length > 0
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
