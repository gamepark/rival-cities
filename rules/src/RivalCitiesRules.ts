import {
  CompetitiveRank,
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
import { Choose1ProductRule } from './rules/Choose1ProductRule'
import { Choose2ProductRule } from './rules/Choose2ProductRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseFirstProductRule } from './rules/ChooseFirstProductRule'
import { ChooseSpecialActionRule } from './rules/ChooseSpecialActionRule'
import { CustomMoveType } from './rules/CustomMoveType'
import { EarnPrestigeAgainRule } from './rules/EarnPrestigeAgainRule'
import { MemoryType } from './rules/MemoryType'
import { OffSeasonChangeSpecialCardsRule } from './rules/OffSeason/OffSeasonChangeSpecialCardsRule'
import { OffSeasonGetPrestigeBonusesRule } from './rules/OffSeason/OffSeasonGetPrestigeBonusesRule'
import { OffSeasonGetShipsBonusesRule } from './rules/OffSeason/OffSeasonGetShipsBonusesRule'
import { OffSeasonPlayerWithMostShipCardsEarnPrestigeRule } from './rules/OffSeason/OffSeasonPlayerWithMostShipCardsEarnPrestigeRule'
import { OffSeasonReactivateFactoriesRule } from './rules/OffSeason/OffSeasonReactivateFactoriesRule'
import { OffSeasonReturnBellRule } from './rules/OffSeason/OffSeasonReturnBellRule'
import { OffSeasonTakeBellRule } from './rules/OffSeason/OffSeasonTakeBellRule'
import { PayProductForAdvanceRule } from './rules/PayProductForAdvanceRule'
import { ResolveLawsuitRule } from './rules/ResolveLawsuitRule'
import { RuleId } from './rules/RuleId'
import { SpecialActionRule } from './rules/SpecialActionRule'
import { OffSeasonPayForAllianceRule } from './rules/OffSeason/OffSeasonPayForAllianceRule'
import { AllianceCardAdvanceAgainInLawsuitRule } from './rules/AllianceCardAdvanceAgainInLawsuitRule'
import { AllianceCardDrawSpecialActionCardAgainRule } from './rules/AllianceCardDrawSpecialActionCardAgainRule'
import { AllianceCardEarnPrestigeAgainRule } from './rules/AllianceCardEarnPrestigeAgainRule'
import { EndOfGameHelper } from './rules/helper/EndOfGameHelper'
import { ComputedActionsHelper } from './rules/helper/ComputedActionsHelper'
import { MemoryHelper } from './rules/helper/MemoryHelper'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class RivalCitiesRules
  extends SecretMaterialRules<City, MaterialType, LocationType>
  implements TimeLimit<MaterialGame, MaterialMove, City>, CompetitiveRank<MaterialGame, MaterialMove, City>
{
  computedActionsHelper = new ComputedActionsHelper(this.game)
  endOfGameHelper = new EndOfGameHelper(this.game)
  rules = {
    [RuleId.ChooseFirstProduct]: ChooseFirstProductRule,
    [RuleId.AdvanceInkJar]: AdvanceInkJarRule,
    [RuleId.PayProductForAdvance]: PayProductForAdvanceRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.BasicAction]: BasicActionRule,
    [RuleId.SpecialAction]: SpecialActionRule,
    [RuleId.AdvanceAgainInLawsuit]: AdvanceAgainInLawsuitRule,
    [RuleId.AllianceCardAdvanceAgainInLawsuit]: AllianceCardAdvanceAgainInLawsuitRule,
    [RuleId.AllianceCardDrawSpecialActionCardAgain]: AllianceCardDrawSpecialActionCardAgainRule,
    [RuleId.AllianceCardEarnPrestigeAgain]: AllianceCardEarnPrestigeAgainRule,
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
    [RuleId.EarnPrestigeAgain]: EarnPrestigeAgainRule,
    [RuleId.ChooseSpecialAction]: ChooseSpecialActionRule,
    [RuleId.Choose2Product]: Choose2ProductRule,
    [RuleId.Choose1Product]: Choose1ProductRule,
    [RuleId.OffSeasonPlayerWithMostShipCardsEarnPrestige]: OffSeasonPlayerWithMostShipCardsEarnPrestigeRule,
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
      [LocationType.PlayerShipCards]: new PositiveSequenceStrategy(),
      [LocationType.ShipCardsRiver]: new StackingStrategy()
    },
    [MaterialType.LawsuitCard]: {
      [LocationType.LawsuitCardDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerLawsuitCards]: new PositiveSequenceStrategy(),
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
      new MemoryHelper(this.game).clearMemory()
      const actionType = this.remind(MemoryType.BasicActionChoosen)
      if(!move.data) {
        this.memorize(MemoryType.ComputedActions, [])
      }
      moves.push(...this.computedActionsHelper.removeActionAndWait(actionType))
    }

    return moves
  }

  giveTime(): number {
    return 60
  }

  rankPlayers(playerA: City, playerB: City): number {
    return this.endOfGameHelper.rankPlayers(playerA, playerB)
  }

  getScore(playerId: number): number | undefined {
    if (this.endOfGameHelper.checkIfWinnerIsDeterminateByScore()) {
      return this.endOfGameHelper.getScore(playerId)
    }
    return undefined
  }

  getTieBreaker(tieBreaker: number, playerId: number): number | undefined {
    if (tieBreaker === 1) {
      const bellToken = this.material(MaterialType.BellToken).location(LocationType.PlayerBellToken).player(playerId)
      return bellToken.length
    }
    return undefined
  }
}
