import { getEnumValues, MaterialGame } from '@gamepark/rules-api'
import { AbstractBasicActionCardRule } from '../rules/basicActions/AbstractBasicActionCardRule'
import { BasicActionCard1Rule } from '../rules/basicActions/BasicActionCard1Rule'
import { BasicActionCard2Rule } from '../rules/basicActions/BasicActionCard2Rule'
import { BasicActionCard3Rule } from '../rules/basicActions/BasicActionCard3Rule'
import { BasicActionCard4Rule } from '../rules/basicActions/BasicActionCard4Rule'
import { BasicActionCard5Rule } from '../rules/basicActions/BasicActionCard5Rule'
import { BasicActionCard6Rule } from '../rules/basicActions/BasicActionCard6Rule'
import { BasicActionCard7Rule } from '../rules/basicActions/BasicActionCard7Rule'

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

export const getBasicActionCardRule = (card: BasicActionCard, game: MaterialGame): AbstractBasicActionCardRule => {
  switch (card) {
    case BasicActionCard.BasicAction1:
      return new BasicActionCard1Rule(game)
    case BasicActionCard.BasicAction2:
      return new BasicActionCard2Rule(game)
    case BasicActionCard.BasicAction3:
      return new BasicActionCard3Rule(game)
    case BasicActionCard.BasicAction4:
      return new BasicActionCard4Rule(game)
    case BasicActionCard.BasicAction5:
      return new BasicActionCard5Rule(game)
    case BasicActionCard.BasicAction6:
      return new BasicActionCard6Rule(game)
    case BasicActionCard.BasicAction7:
      return new BasicActionCard7Rule(game)
    default:
      throw new Error(`BasicActionCard ${card} is not implemented`)
  }
}
