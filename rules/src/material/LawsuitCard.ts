import { getEnumValues, MaterialGame } from '@gamepark/rules-api'
import { Action } from './Action'
import { LawsuitCardHelper } from './helper/LawsuitCardHelper'
import { Product } from './Product'

export enum LawsuitCard {
  Lawsuit1 = 1,
  Lawsuit2,
  Lawsuit3,
  Lawsuit4,
  Lawsuit5,
  Lawsuit6,
  Lawsuit7,
  Lawsuit8,
  Lawsuit9,
  Lawsuit10
}

export type LawsuitCardData = {
  cost: {
    type: Product | 'Letter'
    quantity: number
  }[]
  actionInAdvance: (game: MaterialGame, player: number) => Action[]
  actionInWin: (game: MaterialGame, player: number) => Action[]
  nbStars: number
}

export const lawsuitCards = getEnumValues(LawsuitCard)

export const lawsuitCardData: Record<LawsuitCard, LawsuitCardData> = {
  [LawsuitCard.Lawsuit1]: {
    cost: [{ type: Product.Cloth, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard1ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard1ActionOnWin(),
    nbStars: 1
  },
  [LawsuitCard.Lawsuit2]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard2ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard2ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit3]: {
    cost: [{ type: Product.Furniture, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard3ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard3ActionOnWin(),
    nbStars: 3
  },
  [LawsuitCard.Lawsuit4]: {
    cost: [{ type: 'Letter', quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard4ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard4ActionOnWin(),
    nbStars: 4
  },
  [LawsuitCard.Lawsuit5]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard5ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard5ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit6]: {
    cost: [{ type: Product.Furniture, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard6ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard6ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit7]: {
    cost: [{ type: Product.Cloth, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard7ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard7ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit8]: {
    cost: [
      { type: Product.Cloth, quantity: 1 },
      { type: Product.Leather, quantity: 1 }
    ],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard8ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard8ActionOnWin(),
    nbStars: 3
  },
  [LawsuitCard.Lawsuit9]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard9ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard9ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit10]: {
    cost: [{ type: Product.Beer, quantity: 2 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard10ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawsuitCard10ActionOnWin(),
    nbStars: 2
  }
}
