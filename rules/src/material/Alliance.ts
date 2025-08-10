import { getEnumValues } from '@gamepark/rules-api'
import { AnyProductsCost, cost, CostType, LettersCost, ProductCost } from './Cost'
import { Product } from './Product'

export enum Alliance {
  Amsterdam = 1,
  Bruxelles,
  Gdansk,
  Kjjobenhavn,
  LeHavre,
  London,
  Novgorod,
  Oslo
}

export type AllianceData = {
  cost: ProductCost | AnyProductsCost | LettersCost
  stars: number
}

export const allianceCards = getEnumValues(Alliance)

export const alliancesData: Record<Alliance, AllianceData> = {
  [Alliance.Amsterdam]: { cost: cost(2), stars: 2 },
  [Alliance.Bruxelles]: { cost: cost(1, Product.Furniture), stars: 2 },
  [Alliance.Gdansk]: { cost: { type: CostType.Letters, amount: 1 }, stars: 1 },
  [Alliance.Kjjobenhavn]: { cost: cost(2, Product.Beer), stars: 1 },
  [Alliance.LeHavre]: { cost: cost(1), stars: 2 },
  [Alliance.London]: { cost: cost(1), stars: 1 },
  [Alliance.Novgorod]: { cost: cost(1), stars: 1 },
  [Alliance.Oslo]: { cost: cost(1), stars: 1 }
}
