import {
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  StackingStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { City } from './City'
import { AdvanceInkJarRule } from './rules/AdvanceInkJarRule'
import { BasicActionRule } from './rules/BasicActionRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseFirstProductRule } from './rules/ChooseFirstProductRule'
import { PayProductForAdvanceRule } from './rules/PayProductForAdvanceRule'
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
    [RuleId.ChooseFirstProduct]: ChooseFirstProductRule,
    [RuleId.AdvanceInkJar]: AdvanceInkJarRule,
    [RuleId.PayProductForAdvance]: PayProductForAdvanceRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.BasicAction]: BasicActionRule
  }

  locationsStrategies = {
    [MaterialType.SpecialActionCard]: {
      [LocationType.SpecialActionCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerSpecialActionCardsHand]: new PositiveSequenceStrategy(),
    },
    [MaterialType.AllianceCard]: {
      [LocationType.AllianceCardsLayout]: new StackingStrategy(),
      [LocationType.PlayerAllianceCards]: new PositiveSequenceStrategy(),
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
      [LocationType.SpecialActionCardsDeck]: hideItemId,
      [LocationType.PlayerSpecialActionCardsHand]: hideItemIdToOthers,
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
