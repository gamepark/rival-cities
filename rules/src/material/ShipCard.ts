import { getEnumValues } from '@gamepark/rules-api'

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

export const shipCards = getEnumValues(ShipCard)