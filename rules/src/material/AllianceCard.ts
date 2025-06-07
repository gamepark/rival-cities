import { getEnumValues } from '@gamepark/rules-api'

export enum AllianceCard {
  AllianceAmsterdam = 1,
  AllianceBruxelles,
  AllianceGdansk,
  AllianceKjjobenhavn,
  AllianceLeHavre,
  AllianceLondon,
  AllianceNovgorod,
  AllianceOslo,
}

export const allianceCards = getEnumValues(AllianceCard)