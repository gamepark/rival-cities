import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action, ActionType } from '../Action'
import { Product } from '../Product'

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
        product: Product.Leather,
        quantity: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard1ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.Gift,
        product: Product.Leather,
        quantity: 3,
        canUseAlliance: false
      },
      {
        type: ActionType.EarnPrestige
      }
    ]
  }

  lawersuitCard2ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        product: Product.Furniture,
        quantity: 1,
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
        product: Product.Cloth,
        quantity: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard3ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.Gift,
        quantity: 2,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard4ActionOnAdvance(): Action[] {
    return [{ type: ActionType.EarnPrestige }]
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
        type: ActionType.ReactivateFactory,
        count: 2
      }
    ]
  }

  lawersuitCard5ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.Gift,
        product: Product.Beer,
        quantity: 3,
        canUseAlliance: false
      },
      {
        type: ActionType.Donation,
        nbProduct: 0,
        nbStars: 2,
        nbTimes: 1
      }
    ]
  }

  lawersuitCard6ActionOnAdvance(): Action[] {
    return [{ type: ActionType.EarnPrestige }]
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
        product: Product.Beer,
        quantity: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard7ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige
      },
      {
        type: ActionType.Gift,
        quantity: 1,
        canUseAlliance: false
      }
    ]
  }

  lawersuitCard8ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.Gift,
        product: Product.Beer,
        quantity: 1,
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
    return [{ type: ActionType.EarnPrestige }]
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
        product: Product.Cloth,
        quantity: 1,
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
}
