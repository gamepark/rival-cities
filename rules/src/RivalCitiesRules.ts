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
import { MemoryType } from './rules/MemoryType'
import { OffSeasonChangeSpecialCardsRule } from './rules/OffSeason/OffSeasonChangeSpecialCardsRule'
import { OffSeasonGetPrestigeBonusesRule } from './rules/OffSeason/OffSeasonGetPrestigeBonusesRule'
import { OffSeasonGetShipsBonusesRule } from './rules/OffSeason/OffSeasonGetShipsBonusesRule'
import { OffSeasonReactivateFactoriesRule } from './rules/OffSeason/OffSeasonReactivateFactoriesRule'
import { OffSeasonReturnBellRule } from './rules/OffSeason/OffSeasonReturnBellRule'
import { OffSeasonTakeBellRule } from './rules/OffSeason/OffSeasonTakeBellRule'
import { PayProductForAdvanceRule } from './rules/PayProductForAdvanceRule'
import { ResolveLawsuitRule } from './rules/ResolveLawsuitRule'
import { RuleId } from './rules/RuleId'
import { SpecialActionRule } from './rules/SpecialActionRule'
import { OffSeasonPayForAllianceRule } from './rules/OffSeason/OffSeasonPayForAllianceRule'

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
    [RuleId.SpecialAction]: SpecialActionRule,
    [RuleId.AdvanceAgainInLawsuit]: AdvanceAgainInLawsuitRule,
    [RuleId.ResolveLawsuit]: ResolveLawsuitRule,
    [RuleId.AdvanceLawsuitAction]: AdvanceLawsuitActionRule,
    [RuleId.DrawSpecialActionCardAction]: DrawSpecialActionCardActionRule,
    [RuleId.EarnPrestigeAction]: EarnPrestigeActionRule,
    [RuleId.GainLetterAction]: GainLetterActionRule,
    [RuleId.OffSeasonTakeBell]: OffSeasonTakeBellRule,
    [RuleId.OffSeasonPayForAlliance]: OffSeasonPayForAllianceRule,
    [RuleId.OffSeasonGetShipsBonuses]: OffSeasonGetShipsBonusesRule,
    [RuleId.OffSeasonGetPrestigeBonuses]: OffSeasonGetPrestigeBonusesRule,
    [RuleId.OffSeasonChangeSpecialCards]: OffSeasonChangeSpecialCardsRule,
    [RuleId.OffSeasonReactivateFactories]: OffSeasonReactivateFactoriesRule,
    [RuleId.OffSeasonReturnBell]: OffSeasonReturnBellRule,
  }

  locationsStrategies = {
    [MaterialType.SpecialActionCard]: {
      [LocationType.SpecialActionCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerSpecialActionCardsHand]: new PositiveSequenceStrategy(),
      [LocationType.SpecialActionCardsDiscard]: new PositiveSequenceStrategy()
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
      this.memorize(MemoryType.NbProductToPayForAdvance, 0)
      this.memorize(MemoryType.PlayerNbProducts, 0)
      this.memorize(MemoryType.NbProductGiven, 0)
      this.memorize(MemoryType.NbTimeAdvancedInLawsuit, 0)
      this.memorize(MemoryType.NbSwaps, 0)
      this.memorize(MemoryType.IsProductReturn, false)
      this.memorize(MemoryType.IsBuildInProgress, false)
      this.memorize(MemoryType.NbProductsDonated, 0)
      this.memorize(MemoryType.NbProductStealed, 0)
      this.memorize(MemoryType.NbDonations, 0)
      this.memorize(MemoryType.NbCardsDraw, 0)
      this.memorize(MemoryType.IsDonationInProgress, false)
      this.memorize(MemoryType.ComputedActions, [])
      this.forget(MemoryType.ProductChoosen)
      this.forget(MemoryType.ShipChoosen)
      this.forget(MemoryType.LawsuitAdvanced)
      this.forget(MemoryType.BasicActionChoosen)
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }

    return moves
  }

  giveTime(): number {
    return 60
  }
}
