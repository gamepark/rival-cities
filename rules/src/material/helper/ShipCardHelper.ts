import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { Action } from '../Actions/Actions'
import { ActionType } from '../Actions/ActionType'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Product } from '../Product'

export class ShipCardHelper extends MaterialRulesPart {
  player: number

  constructor(game: MaterialGame, player: number) {
    super(game)
    this.player = player
  }

  shipCard1(): Action[] {
    return [{ type: ActionType.EarnPrestige }, { type: ActionType.EarnPrestige }]
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
    return [{ type: ActionType.EarnPrestige }]
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
}
