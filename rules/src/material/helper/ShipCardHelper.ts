import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { Action } from '../Actions/Actions'
import { ActionType } from '../Actions/ActionType'
import { Alliance } from '../Alliance'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Product } from '../Product'
import { ShipCard } from '../ShipCard'

export class ShipCardHelper extends MaterialRulesPart {
  player: number

  constructor(game: MaterialGame, player: number) {
    super(game)
    this.player = player
  }

  shipCard1(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      },
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      }
    ]
  }

  shipCard2(): Action[] {
    return [
      {
        type: ActionType.AdvanceLawsuit,
        nbTimeAlreadyAdvanced: 0
      },
      {
        type: ActionType.AdvanceLawsuit,
        nbTimeAlreadyAdvanced: 0
      }
    ]
  }

  shipCard3(): Action[] {
    return [{ type: ActionType.DrawSpecialActionCard }]
  }

  shipCard4(): Action[] {
    return [
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 1
      }
    ]
  }

  shipCard5(): Action[] {
    return [
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 2
      }
    ]
  }

  shipCard6(): Action[] {
    return [
      {
        type: ActionType.Donation,
        productType: undefined,
        nbProduct: 0,
        nbStars: 1,
        nbTimes: 1
      }
    ]
  }

  shipCard7(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Furniture,
        nbProductToTake: 2,
        canUseAlliance: false
      }
    ]
  }

  shipCard8(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      }
    ]
  }

  shipCard9(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Cloth,
        nbProductToTake: 2,
        canUseAlliance: false
      }
    ]
  }

  shipCard10(): Action[] {
    return [
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 1
      }
    ]
  }

  getProductMove(product: Product, quantity: number): MaterialMove[] {
    return this.material(MaterialType.Product)
      .location(LocationType.ProductPiles)
      .id(product)
      .moveItems({ type: LocationType.PlayerProducts, player: this.player, id: product }, quantity)
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
}
