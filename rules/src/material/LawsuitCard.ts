import { getEnumValues } from '@gamepark/rules-api'

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

export const lawsuitCards = getEnumValues(LawsuitCard)