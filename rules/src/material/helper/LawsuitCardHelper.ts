import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Action, ActionType } from '../Action'
import { Product } from '../Product'

export class LawsuitCardHelper extends MaterialRulesPart {
  player: number

  constructor(game: MaterialGame, player: number) {
    super(game)
    this.player = player
  }

  lawsuitCard1ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Leather,
        quantity: 1
      }
    ]
  }

  lawsuitCard1ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Leather,
        quantity: 3
      },
      {
        type: ActionType.EarnPrestige
      }
    ]
  }

  lawsuitCard2ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Furniture,
        quantity: 1
      }
    ]
  }

  lawsuitCard2ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }

  lawsuitCard3ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Cloth,
        quantity: 1
      }
    ]
  }

  lawsuitCard3ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        quantity: 2
      }
    ]
  }

  lawsuitCard4ActionOnAdvance(): Action[] {
    return [{ type: ActionType.EarnPrestige }]
  }

  lawsuitCard4ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }

  lawsuitCard5ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.ReactivateFactory,
        count: 2
      }
    ]
  }

  lawsuitCard5ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Beer,
        quantity: 3
      },
      {
        type: ActionType.Donation,
        nbProduct: 0,
        nbStars: 2,
        nbTimes: 1
      }
    ]
  }

  lawsuitCard6ActionOnAdvance(): Action[] {
    return [{ type: ActionType.EarnPrestige }]
  }

  lawsuitCard6ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 2
      }
    ]
  }

  lawsuitCard7ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Beer,
        quantity: 1
      }
    ]
  }

  lawsuitCard7ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.EarnPrestige
      },
      {
        type: ActionType.GainProducts,
        quantity: 1
      }
    ]
  }

  lawsuitCard8ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Beer,
        quantity: 1
      },
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 1
      }
    ]
  }

  lawsuitCard8ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }

  lawsuitCard9ActionOnAdvance(): Action[] {
    return [{ type: ActionType.EarnPrestige }]
  }

  lawsuitCard9ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.GainLetter,
        nbLettersToTake: 1
      }
    ]
  }

  lawsuitCard10ActionOnAdvance(): Action[] {
    return [
      {
        type: ActionType.GainProducts,
        product: Product.Cloth,
        quantity: 1
      }
    ]
  }

  lawsuitCard10ActionOnWin(): Action[] {
    return [
      {
        type: ActionType.BuildFactory,
        price: 0
      }
    ]
  }
}
