import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action } from '../Actions/Actions'
import { AllianceCard } from '../AllianceCard'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Product } from '../Product'
import { ActionType } from '../Actions/ActionType'
import { ShipCard } from '../ShipCard'

export class LawsuitCardHelper extends MaterialRulesPart {
  player: number

  constructor(game: MaterialGame, player: number) {
    super(game)
    this.player = player
  }

  lawersuitCard1ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Leather,
        nbProductToTake: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard1ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Leather,
        nbProductToTake: 3,
        canUseAlliance: false
      },
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      }
    ]
  }

  lawersuitCard2ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Furniture,
        nbProductToTake: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard2ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }

  lawersuitCard3ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Cloth,
        nbProductToTake: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard3ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: undefined,
        nbProductToTake: 2,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard4ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      }
    ]
  }

  lawersuitCard4ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }

  lawersuitCard5ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.ReturnFactory,
        nbFactoryCanReturn: 2
      }
    ]
  }

  lawersuitCard5ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Beer,
        nbProductToTake: 3,
        canUseAlliance: false
      },
      {
        type: ActionType.Donation,
        productType: undefined,
        nbProduct: 0,
        nbStars: 2,
        nbTimes: 1
      }
    ]
  }

  lawersuitCard6ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      }
    ]
  }

  lawersuitCard6ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 2
      }
    ]
  }

  lawersuitCard7ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Beer,
        nbProductToTake: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard7ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      },
      {
        type: ActionType.Gift,
        productType: undefined,
        nbProductToTake: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard8ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Beer,
        nbProductToTake: 1,
        canUseAlliance: false
      },
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 1
      }
    ]
  }

  lawersuitCard8ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }

  lawersuitCard9ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige,
        playerWhoEarnedPrestige: this.player,
        playerCanUseAllianceBruxelles: this.checkPlayerHaveBruxellesCard,
        playerCanUseShip16: this.checkPlayerHaveShip16
      }
    ]
  }

  lawersuitCard9ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 1
      }
    ]
  }

  lawersuitCard10ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        productType: Product.Cloth,
        nbProductToTake: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard10ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }

  get checkPlayerHaveBruxellesCard(): boolean {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceBruxelles).length > 0
  }

  get checkPlayerHaveShip16(): boolean {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship16).length > 0
  }
}
