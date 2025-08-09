import { getEnumValues, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Action } from './Actions/Actions'
import { ActionType } from './Actions/ActionType'
import { ShipCardHelper } from './helper/ShipCardHelper'
import { Product } from './Product'

export enum ShipCard {
  Ship1 = 1,
  Ship2,
  Ship3,
  Ship4,
  Ship5,
  Ship6,
  Ship7,
  Ship8,
  Ship9,
  Ship10,
  Ship11,
  Ship12,
  Ship13,
  Ship14,
  Ship15,
  Ship16,
  Ship17,
  Ship18,
  Ship19,
  Ship20,
  Ship21
}

export enum ShipEffectType {
  Instant = 1,
  OffSeason,
  OnProduction,
  Always,
  None
}

export type ShipCardData = {
  cost: {
    type: Product
    quantity: number
  }
  effect: {
    type: ShipEffectType
    getActions?: (game: MaterialGame, player: number) => Action[]
    move?: (game: MaterialGame, player: number) => MaterialMove[]
  }
  getNbStars: (_nbShip: number) => number
}

export const shipCards = getEnumValues(ShipCard)

export const shipCardsData: Record<ShipCard, ShipCardData> = {
  [ShipCard.Ship1]: {
    cost: { type: Product.Furniture, quantity: 3 },
    effect: { type: ShipEffectType.Instant, getActions: () => [{ type: ActionType.EarnPrestige }, { type: ActionType.EarnPrestige }] },
    getNbStars: () => 1
  },
  [ShipCard.Ship2]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: {
      type: ShipEffectType.Instant,
      getActions: () => [
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0
        },
        {
          type: ActionType.AdvanceLawsuit,
          nbTimeAlreadyAdvanced: 0
        }
      ]
    },
    getNbStars: () => 2
  },
  [ShipCard.Ship3]: {
    cost: { type: Product.Leather, quantity: 3 },
    effect: { type: ShipEffectType.Instant, getActions: () => [{ type: ActionType.DrawSpecialActionCard }] },
    getNbStars: () => 2
  },
  [ShipCard.Ship4]: {
    cost: { type: Product.Furniture, quantity: 2 },
    effect: {
      type: ShipEffectType.Instant,
      getActions: () => [
        {
          type: ActionType.GainLetter,
          nbLettersToTake: 1
        }
      ]
    },
    getNbStars: () => 3
  },
  [ShipCard.Ship5]: {
    cost: { type: Product.Furniture, quantity: 2 },
    effect: {
      type: ShipEffectType.Instant,
      getActions: () => [
        {
          type: ActionType.GainLetter,
          nbLettersToTake: 2
        }
      ]
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship6]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: {
      type: ShipEffectType.OffSeason,
      getActions: () => [
        {
          type: ActionType.Donation,
          nbProduct: 0,
          nbStars: 1,
          nbTimes: 1
        }
      ]
    },
    getNbStars: () => 2
  },
  [ShipCard.Ship7]: {
    cost: { type: Product.Cloth, quantity: 5 },
    effect: {
      type: ShipEffectType.OffSeason,
      getActions: () => [
        {
          type: ActionType.Gift,
          productType: Product.Furniture,
          nbProductToTake: 2,
          canUseAlliance: false
        }
      ]
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship8]: {
    cost: { type: Product.Cloth, quantity: 4 },
    effect: {
      type: ShipEffectType.OffSeason,
      getActions: () => [{ type: ActionType.EarnPrestige }]
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship9]: {
    cost: { type: Product.Beer, quantity: 5 },
    effect: {
      type: ShipEffectType.OffSeason,
      getActions: () => [
        {
          type: ActionType.Gift,
          productType: Product.Cloth,
          nbProductToTake: 2,
          canUseAlliance: false
        }
      ]
    },
    getNbStars: () => 2
  },
  [ShipCard.Ship10]: {
    cost: { type: Product.Beer, quantity: 5 },
    effect: {
      type: ShipEffectType.OffSeason,
      getActions: () => [
        {
          type: ActionType.GainLetter,
          nbLettersToTake: 1
        }
      ]
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship11]: {
    cost: { type: Product.Cloth, quantity: 4 },
    effect: {
      type: ShipEffectType.OnProduction,
      move: (game, player) => new ShipCardHelper(game, player).getProductMove(Product.Beer, 1)
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship12]: {
    cost: { type: Product.Beer, quantity: 6 },
    effect: {
      type: ShipEffectType.OnProduction,
      move: (game, player) => new ShipCardHelper(game, player).getProductMove(Product.Leather, 1)
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship13]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: {
      type: ShipEffectType.OnProduction,
      move: (game, player) => new ShipCardHelper(game, player).getProductMove(Product.Cloth, 1)
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship14]: {
    cost: { type: Product.Cloth, quantity: 5 },
    effect: {
      type: ShipEffectType.OnProduction,
      move: (game, player) => new ShipCardHelper(game, player).getProductMove(Product.Furniture, 1)
    },
    getNbStars: () => 1
  },
  [ShipCard.Ship15]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship16]: {
    cost: { type: Product.Furniture, quantity: 3 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 2
  },
  [ShipCard.Ship17]: {
    cost: { type: Product.Leather, quantity: 3 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship18]: {
    cost: { type: Product.Furniture, quantity: 4 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship19]: {
    cost: { type: Product.Beer, quantity: 4 },
    effect: { type: ShipEffectType.Always },
    getNbStars: () => 1
  },
  [ShipCard.Ship20]: {
    cost: { type: Product.Leather, quantity: 4 },
    effect: { type: ShipEffectType.None },
    getNbStars: () => 5
  },
  [ShipCard.Ship21]: {
    cost: { type: Product.Cloth, quantity: 3 },
    effect: { type: ShipEffectType.None },
    getNbStars: (nbShip) => nbShip
  }
}
