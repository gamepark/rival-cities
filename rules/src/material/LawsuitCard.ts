import { getEnumValues, MaterialGame, MaterialMove } from '@gamepark/rules-api'
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
  actionInAdvance: (game: MaterialGame, player: number) => MaterialMove[]
  actionInWin: (game: MaterialGame, player: number) => MaterialMove[]
  nbStars: number
}

export const lawsuitCards = getEnumValues(LawsuitCard)

export const lawsuitCardData: Record<LawsuitCard, LawsuitCardData> = {
  [LawsuitCard.Lawsuit1]: {
    cost: [{ type: Product.Cloth, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard1ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard1ActionOnWin(),
    nbStars: 1
  },
  [LawsuitCard.Lawsuit2]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard2ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard2ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit3]: {
    cost: [{ type: Product.Furniture, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard3ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard3ActionOnWin(),
    nbStars: 3
  },
  [LawsuitCard.Lawsuit4]: {
    cost: [{ type: 'Letter', quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard4ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard4ActionOnWin(),
    nbStars: 4
  },
  [LawsuitCard.Lawsuit5]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard5ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard5ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit6]: {
    cost: [{ type: Product.Furniture, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard6ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard6ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit7]: {
    cost: [{ type: Product.Cloth, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard7ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard7ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit8]: {
    cost: [{ type: Product.Cloth, quantity: 1 }, { type: Product.Leather, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard8ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard8ActionOnWin(),
    nbStars: 3
  },
  [LawsuitCard.Lawsuit9]: {
    cost: [{ type: Product.Leather, quantity: 1 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard9ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard9ActionOnWin(),
    nbStars: 2
  },
  [LawsuitCard.Lawsuit10]: {
    cost: [{ type: Product.Beer, quantity: 2 }],
    actionInAdvance: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard10ActionOnAdvance(),
    actionInWin: (game, player) => new LawsuitCardHelper(game, player).lawersuitCard10ActionOnWin(),
    nbStars: 2
  }
}