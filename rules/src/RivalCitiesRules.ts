import {
  CustomMove,
  hideItemId,
  hideItemIdToOthers,
  isCustomMoveType,
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
import { AdvanceLawsuitActionRule } from './rules/actions/AdvanceLawsuitActionRule'
import { DrawSpecialActionCardActionRule } from './rules/actions/DrawSpecialActionCardActionRule'
import { EarnPrestigeActionRule } from './rules/actions/EarnPrestigeActionRule'
import { GainLetterActionRule } from './rules/actions/GainLetterActionRule'
import { AdvanceAgainInLawsuitRule } from './rules/AdvanceAgainInLawsuitRule'
import { AdvanceInkJarRule } from './rules/AdvanceInkJarRule'
import { BasicActionRule } from './rules/BasicActionRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseFirstProductRule } from './rules/ChooseFirstProductRule'
import { CustomMoveType } from './rules/CustomMoveType'
import { NextRuleHelper } from './rules/helper/NextRuleHelper'
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
  nextRuleHelper = new NextRuleHelper(this.game)
  rules = {
    [RuleId.ChooseFirstProduct]: ChooseFirstProductRule,
    [RuleId.AdvanceInkJar]: AdvanceInkJarRule,
    [RuleId.PayProductForAdvance]: PayProductForAdvanceRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.BasicAction]: BasicActionRule,
    [RuleId.AdvanceAgainInLawsuit]: AdvanceAgainInLawsuitRule,
    [RuleId.AdvanceLawsuitAction]: AdvanceLawsuitActionRule,
    [RuleId.DrawSpecialActionCardAction]: DrawSpecialActionCardActionRule,
    [RuleId.EarnPrestigeAction]: EarnPrestigeActionRule,
    [RuleId.GainLetterAction]: GainLetterActionRule
  }

  locationsStrategies = {
    [MaterialType.SpecialActionCard]: {
      [LocationType.SpecialActionCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerSpecialActionCardsHand]: new PositiveSequenceStrategy()
    },
    [MaterialType.AllianceCard]: {
      [LocationType.AllianceCardsLayout]: new StackingStrategy(),
      [LocationType.PlayerAllianceCards]: new PositiveSequenceStrategy()
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
      [LocationType.PlayerSpecialActionCardsHand]: hideItemIdToOthers
    },
    [MaterialType.ShipCard]: {
      [LocationType.ShipCardsDeck]: hideItemId
    },
    [MaterialType.LawsuitCard]: {
      [LocationType.LawsuitCardDeck]: hideItemId
    }
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves: MaterialMove[] = []

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }

    return moves
  }

  giveTime(): number {
    return 60
  }
}
