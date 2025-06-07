import { hideItemId, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, StackingStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { City } from './City'
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class RivalCitiesRules
  extends SecretMaterialRules<City, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<City, MaterialType, LocationType>, MaterialMove<City, MaterialType, LocationType>, City>
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  locationsStrategies = {
    [MaterialType.SpecialActionCard]: {
      [LocationType.SpecialActionCardsDeck]: new PositiveSequenceStrategy()
    },
    [MaterialType.AllianceCard]: {
      [LocationType.AllianceCardsLayout]: new PositiveSequenceStrategy()
    },
    [MaterialType.ShipCard]: {
      [LocationType.ShipCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.ShipCardsRiver]: new StackingStrategy()
    },
    [MaterialType.LawsuitCard]: {
      [LocationType.LawsuitCardDeck]: new PositiveSequenceStrategy(),
      [LocationType.LawsuitCardsRiver]: new StackingStrategy()
    },
    [MaterialType.Factory]: {
      [LocationType.PlayerFactories]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.SpecialActionCard]: {
      [LocationType.SpecialActionCardsDeck]: hideItemId
    },
    [MaterialType.ShipCard]: {
      [LocationType.ShipCardsDeck]: hideItemId
    },
    [MaterialType.LawsuitCard]: {
      [LocationType.LawsuitCardDeck]: hideItemId
    }
  }

  giveTime(): number {
    return 60
  }
}
