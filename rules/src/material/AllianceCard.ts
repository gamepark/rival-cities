import { getEnumValues } from '@gamepark/rules-api'
import { Product } from './Product'

export enum AllianceCard {
  AllianceAmsterdam = 1,
  AllianceBruxelles,
  AllianceGdansk,
  AllianceKjjobenhavn,
  AllianceLeHavre,
  AllianceLondon,
  AllianceNovgorod,
  AllianceOslo
}

export type AllianceData = {
  cost : {
    product?: Product | 'Letter'
    amount: number
  }
  stars: number
}

export const allianceCards = getEnumValues(AllianceCard)

export const allianceDatas: Record<AllianceCard, AllianceData> = {
  [AllianceCard.AllianceAmsterdam]: { cost: { amount: 2 }, stars: 2 },
  [AllianceCard.AllianceBruxelles]: { cost: { product: Product.Furniture, amount: 1 }, stars: 2 },
  [AllianceCard.AllianceGdansk]: { cost: { product: 'Letter', amount: 1 }, stars: 1 },
  [AllianceCard.AllianceKjjobenhavn]: { cost: { product: Product.Beer, amount: 2 }, stars: 1 },
  [AllianceCard.AllianceLeHavre]: { cost: { amount: 1 }, stars: 2 },
  [AllianceCard.AllianceLondon]: { cost: { amount: 1 }, stars: 1 },
  [AllianceCard.AllianceNovgorod]: { cost: { amount: 1 }, stars: 1 },
  [AllianceCard.AllianceOslo]: { cost: { amount: 1 }, stars: 1 }
}
