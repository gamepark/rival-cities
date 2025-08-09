import { Action, ActionType } from './Action'
import { Product } from './Product'

export enum ShipEffectType {
  Instant = 1,
  OffSeason,
  OnProduction,
  Always
}

export type ShipData = {
  cost: {
    type: Product
    quantity: number
  }
  effect?: {
    type: ShipEffectType
    actions?: Action[]
    product?: Product
  }
  getNbStars: (_nbShip: number) => number
}

export function getShipData(ship: number): ShipData {
  switch (ship) {
    case 1:
      return {
        cost: { type: Product.Furniture, quantity: 3 },
        effect: {
          type: ShipEffectType.Instant,
          actions: [{ type: ActionType.EarnPrestige }, { type: ActionType.EarnPrestige }]
        },
        getNbStars: () => 1
      }
    case 2:
      return {
        cost: { type: Product.Cloth, quantity: 3 },
        effect: {
          type: ShipEffectType.Instant,
          actions: [
            { type: ActionType.AdvanceLawsuit, nbTimeAlreadyAdvanced: 0 },
            { type: ActionType.AdvanceLawsuit, nbTimeAlreadyAdvanced: 0 }
          ]
        },
        getNbStars: () => 2
      }
    case 3:
      return {
        cost: { type: Product.Leather, quantity: 3 },
        effect: {
          type: ShipEffectType.Instant,
          actions: [{ type: ActionType.DrawSpecialActionCard }]
        },
        getNbStars: () => 2
      }
    case 4:
      return {
        cost: { type: Product.Furniture, quantity: 2 },
        effect: {
          type: ShipEffectType.Instant,
          actions: [{ type: ActionType.GainLetter, nbLettersToTake: 1 }]
        },
        getNbStars: () => 3
      }
    case 5:
      return {
        cost: { type: Product.Furniture, quantity: 2 },
        effect: {
          type: ShipEffectType.Instant,
          actions: [{ type: ActionType.GainLetter, nbLettersToTake: 2 }]
        },
        getNbStars: () => 1
      }
    case 6:
      return {
        cost: { type: Product.Leather, quantity: 4 },
        effect: {
          type: ShipEffectType.OffSeason,
          actions: [{ type: ActionType.Donation, nbProduct: 0, nbStars: 1, nbTimes: 1 }]
        },
        getNbStars: () => 2
      }
    case 7:
      return {
        cost: { type: Product.Cloth, quantity: 5 },
        effect: {
          type: ShipEffectType.OffSeason,
          actions: [{ type: ActionType.GainProducts, product: Product.Furniture, quantity: 2 }]
        },
        getNbStars: () => 1
      }
    case 8:
      return {
        cost: { type: Product.Cloth, quantity: 4 },
        effect: {
          type: ShipEffectType.OffSeason,
          actions: [{ type: ActionType.EarnPrestige }]
        },
        getNbStars: () => 1
      }
    case 9:
      return {
        cost: { type: Product.Beer, quantity: 5 },
        effect: {
          type: ShipEffectType.OffSeason,
          actions: [{ type: ActionType.GainProducts, product: Product.Cloth, quantity: 2 }]
        },
        getNbStars: () => 2
      }
    case 10:
      return {
        cost: { type: Product.Beer, quantity: 5 },
        effect: {
          type: ShipEffectType.OffSeason,
          actions: [{ type: ActionType.GainLetter, nbLettersToTake: 1 }]
        },
        getNbStars: () => 1
      }
    case 11:
      return {
        cost: { type: Product.Cloth, quantity: 4 },
        effect: {
          type: ShipEffectType.OnProduction,
          product: Product.Beer
        },
        getNbStars: () => 1
      }
    case 12:
      return {
        cost: { type: Product.Beer, quantity: 6 },
        effect: {
          type: ShipEffectType.OnProduction,
          product: Product.Leather
        },
        getNbStars: () => 1
      }
    case 13:
      return {
        cost: { type: Product.Leather, quantity: 4 },
        effect: {
          type: ShipEffectType.OnProduction,
          product: Product.Cloth
        },
        getNbStars: () => 1
      }
    case 14:
      return {
        cost: { type: Product.Cloth, quantity: 5 },
        effect: {
          type: ShipEffectType.OnProduction,
          product: Product.Furniture
        },
        getNbStars: () => 1
      }
    case 15:
      return {
        cost: { type: Product.Cloth, quantity: 3 },
        effect: { type: ShipEffectType.Always },
        getNbStars: () => 1
      }
    case 16:
      return {
        cost: { type: Product.Furniture, quantity: 3 },
        effect: { type: ShipEffectType.Always },
        getNbStars: () => 2
      }
    case 17:
      return {
        cost: { type: Product.Leather, quantity: 3 },
        effect: { type: ShipEffectType.Always },
        getNbStars: () => 1
      }
    case 18:
      return {
        cost: { type: Product.Furniture, quantity: 4 },
        effect: { type: ShipEffectType.Always },
        getNbStars: () => 1
      }
    case 19:
      return {
        cost: { type: Product.Beer, quantity: 4 },
        effect: { type: ShipEffectType.Always },
        getNbStars: () => 1
      }
    case 20:
      return {
        cost: { type: Product.Leather, quantity: 4 },
        getNbStars: () => 5
      }
    case 21:
      return {
        cost: { type: Product.Cloth, quantity: 3 },
        getNbStars: (nbShip) => nbShip
      }
    default:
      throw new Error(`Unknown ship: ${ship}`)
  }
}
