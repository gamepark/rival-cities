import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action } from '../Actions/Actions'
import { ActionType } from '../Actions/ActionType'
import { Alliance } from '../Alliance'
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

  getCardAction(card: BasicActionCard): Action {
    switch (card) {
      case BasicActionCard.BasicAction1:
        return {
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
        }
      case BasicActionCard.BasicAction2:
        return {
          type: ActionType.DrawSpecialActionCard,
          nbCardsToDraw: 1,
          playerCanUseAllianceKjjobenhavn: this.checkPlayerHaveKjjobenhavnAllianceCard
        }
      case BasicActionCard.BasicAction3:
        return {
          type: ActionType.FormAlliance
        }
      case BasicActionCard.BasicAction4:
        return {
          type: ActionType.BuildFactory,
          price: 2
        }
      case BasicActionCard.BasicAction5:
        return {
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
        }
      case BasicActionCard.BasicAction6:
        return {
          type: ActionType.Production,
          productType: Product.Cloth,
          quantity: 1,
          canGetMore: true
        }
      case BasicActionCard.BasicAction7:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.PurchaseShip,
              playerHasShip19: this.checkPlayerHaveShip19
            },
            {
              type: ActionType.AdvanceLawsuit,
              nbTimeAlreadyAdvanced: 0
            }
          ]
        }
      case BasicActionCard.BasicAction8:
        return {
          type: ActionType.Multiple,
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
        }
      case BasicActionCard.BasicAction9:
        return {
          type: this.computeActionIfPlayerHasGdanskAlliance(),
          actions: [
            {
              type: ActionType.AdvanceLawsuit,
              nbTimeAlreadyAdvanced: 0
            },
            {
              type: ActionType.Production,
              productType: Product.Leather,
              quantity: 1,
              canGetMore: true
            }
          ]
        }
      case BasicActionCard.BasicAction10:
        return {
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
        }
      case BasicActionCard.BasicAction11:
        return {
          type: ActionType.Production,
          productType: Product.Leather,
          quantity: 1,
          canGetMore: true
        }
      case BasicActionCard.BasicAction12:
        return {
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
              nbTimeAlreadyAdvanced: 0
            }
          ]
        }
      case BasicActionCard.BasicAction13:
        return {
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
        }
      case BasicActionCard.BasicAction14:
        return {
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
        }
      case BasicActionCard.BasicAction15:
        return {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0
        }
    }
  }

  computeActionIfPlayerHasGdanskAlliance(): ActionType.Choice | ActionType.Multiple {
    return this.checkPlayerHaveGdanskAllianceCard ? ActionType.Multiple : ActionType.Choice
  }

  get checkPlayerHaveGdanskAllianceCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.player).id(Alliance.Gdansk).length > 0
  }

  get checkPlayerHaveKjjobenhavnAllianceCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.player).id(Alliance.Kjjobenhavn).length > 0
  }

  get checkPlayerHaveBruxellesCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.player).id(Alliance.Bruxelles).length > 0
  }

  get checkPlayerHaveShip16(): boolean {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship16).length > 0
  }

  get checkPlayerHaveShip19() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship19).length > 0
  }
}
