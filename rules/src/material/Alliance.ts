import { getEnumValues } from '@gamepark/rules-api'
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
  cost: {
    product?: Product | 'Letter'
    amount: number
  }
  stars: number
}

export const allianceCards = getEnumValues(Alliance)

export const alliancesData: Record<Alliance, AllianceData> = {
  [Alliance.Amsterdam]: { cost: { amount: 2 }, stars: 2 },
  [Alliance.Bruxelles]: { cost: { product: Product.Furniture, amount: 1 }, stars: 2 },
  [Alliance.Gdansk]: { cost: { product: 'Letter', amount: 1 }, stars: 1 },
  [Alliance.Kjjobenhavn]: { cost: { product: Product.Beer, amount: 2 }, stars: 1 },
  [Alliance.LeHavre]: { cost: { amount: 1 }, stars: 2 },
  [Alliance.London]: { cost: { amount: 1 }, stars: 1 },
  [Alliance.Novgorod]: { cost: { amount: 1 }, stars: 1 },
  [Alliance.Oslo]: { cost: { amount: 1 }, stars: 1 }
}
