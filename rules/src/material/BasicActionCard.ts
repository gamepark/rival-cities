import { getEnumValues } from '@gamepark/rules-api'

export enum BasicActionCard {
  BasicAction1 = 1,
  BasicAction2,
  BasicAction3,
  BasicAction4,
  BasicAction5,
  BasicAction6,
  BasicAction7,
  BasicAction8,
  BasicAction9,
  BasicAction10,
  BasicAction11,
  BasicAction12,
  BasicAction13,
  BasicAction14,
  BasicAction15
}

export const basicActionCards = getEnumValues(BasicActionCard)