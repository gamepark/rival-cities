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
import { City } from './City'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { AdvanceLawsuitActionRule } from './rules/actions/AdvanceLawsuitActionRule'
import { BuildFactoryActionRule } from './rules/actions/BuildFactoryActionRule'
import { ChoiceActionRule } from './rules/actions/ChoiceActionRule'
import { ComputedActionRule } from './rules/actions/ComputedActionRule'
import { CourtRulingActionRule } from './rules/actions/CourtRulingActionRule'
import { DonationActionRule } from './rules/actions/DonationActionRule'
import { DrawSpecialActionCardActionRule } from './rules/actions/DrawSpecialActionCardActionRule'
import { EarnPrestigeActionRule } from './rules/actions/EarnPrestigeActionRule'
import { FormAllianceActionRule } from './rules/actions/FormAllianceActionRule'
import { GainLetterActionRule } from './rules/actions/GainLetterActionRule'
import { GiftActionRule } from './rules/actions/GiftActionRule'
import { OpponentEarnPrestigeActionRule } from './rules/actions/OpponentEarnPrestigeActionRule'
import { PiracyActionRule } from './rules/actions/PiracyActionRule'
import { ProductionActionRule } from './rules/actions/ProductionActionRule'
import { ProductSwapActionRule } from './rules/actions/ProductSwapActionRule'
import { PurchaseShipActionRule } from './rules/actions/PurchaseShipActionRule'
import { ResolveLawsuitActionRule } from './rules/actions/ResolveLawsuitActionRule'
import { ReturnFactoryActionRule } from './rules/actions/ReturnFactoryActionRule'
import { AdvanceInkJarRule } from './rules/AdvanceInkJarRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseFirstProductRule } from './rules/ChooseFirstProductRule'
import { ChooseSpecialActionRule } from './rules/ChooseSpecialActionRule'
import { ConfirmEndTurnRule } from './rules/ConfirmEndTurnRule'
import { CustomMoveType } from './rules/CustomMoveType'
import { EndOfGameHelper } from './rules/helper/EndOfGameHelper'
import { MemoryHelper } from './rules/helper/MemoryHelper'
import { OffSeasonChangeSpecialCardsRule } from './rules/OffSeason/OffSeasonChangeSpecialCardsRule'
import { OffSeasonGetPrestigeBonusesRule } from './rules/OffSeason/OffSeasonGetPrestigeBonusesRule'
import { OffSeasonGetShipsBonusesRule } from './rules/OffSeason/OffSeasonGetShipsBonusesRule'
import { OffSeasonPayForAllianceRule } from './rules/OffSeason/OffSeasonPayForAllianceRule'
import { OffSeasonPlayerWithMostShipCardsEarnPrestigeRule } from './rules/OffSeason/OffSeasonPlayerWithMostShipCardsEarnPrestigeRule'
import { OffSeasonReactivateFactoriesRule } from './rules/OffSeason/OffSeasonReactivateFactoriesRule'
import { OffSeasonReturnBellRule } from './rules/OffSeason/OffSeasonReturnBellRule'
import { OffSeasonTakeBellRule } from './rules/OffSeason/OffSeasonTakeBellRule'
import { PayProductForAdvanceRule } from './rules/PayProductForAdvanceRule'
import { PayToPerformActionAgainRule } from './rules/PayToPerformActionAgainRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class RivalCitiesRules
  extends SecretMaterialRules<City, MaterialType, LocationType>
  implements TimeLimit<MaterialGame, MaterialMove, City>, CompetitiveRank<MaterialGame, MaterialMove, City>
{
  endOfGameHelper = new EndOfGameHelper(this.game)
  rules = {
    [RuleId.ChooseFirstProduct]: ChooseFirstProductRule,
    [RuleId.AdvanceInkJar]: AdvanceInkJarRule,
    [RuleId.PayProductForAdvance]: PayProductForAdvanceRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.Choice]: ChoiceActionRule,
    [RuleId.Computed]: ComputedActionRule,
    [RuleId.ResolveLawsuit]: ResolveLawsuitActionRule,
    [RuleId.AdvanceLawsuit]: AdvanceLawsuitActionRule,
    [RuleId.DrawSpecialActionCard]: DrawSpecialActionCardActionRule,
    [RuleId.EarnPrestige]: EarnPrestigeActionRule,
    [RuleId.OpponentEarnPrestige]: OpponentEarnPrestigeActionRule,
    [RuleId.GainLetter]: GainLetterActionRule,
    [RuleId.OffSeasonTakeBell]: OffSeasonTakeBellRule,
    [RuleId.OffSeasonPayForAlliance]: OffSeasonPayForAllianceRule,
    [RuleId.OffSeasonGetShipsBonuses]: OffSeasonGetShipsBonusesRule,
    [RuleId.OffSeasonGetPrestigeBonuses]: OffSeasonGetPrestigeBonusesRule,
    [RuleId.OffSeasonChangeSpecialCards]: OffSeasonChangeSpecialCardsRule,
    [RuleId.OffSeasonReactivateFactories]: OffSeasonReactivateFactoriesRule,
    [RuleId.OffSeasonPlayerWithMostShipCardsEarnPrestige]: OffSeasonPlayerWithMostShipCardsEarnPrestigeRule,
    [RuleId.OffSeasonReturnBell]: OffSeasonReturnBellRule,
    [RuleId.ChooseSpecialAction]: ChooseSpecialActionRule,
    [RuleId.Piracy]: PiracyActionRule,
    [RuleId.PurchaseShip]: PurchaseShipActionRule,
    [RuleId.BuildFactory]: BuildFactoryActionRule,
    [RuleId.Donation]: DonationActionRule,
    [RuleId.FormAlliance]: FormAllianceActionRule,
    [RuleId.Gift]: GiftActionRule,
    [RuleId.ProductSwap]: ProductSwapActionRule,
    [RuleId.ReturnFactory]: ReturnFactoryActionRule,
    [RuleId.CourtRuling]: CourtRulingActionRule,
    [RuleId.Production]: ProductionActionRule,
    [RuleId.PayToPerformActionAgain]: PayToPerformActionAgainRule,
    [RuleId.ConfirmEndTurn]: ConfirmEndTurnRule
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
    [MaterialType.LawsuitPiece]: {
      [LocationType.LawsuitPieceSpot]: new PositiveSequenceStrategy()
    },
    [MaterialType.LawsuitCard]: {
      [LocationType.LawsuitDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerLawsuitCards]: new PositiveSequenceStrategy()
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
      [LocationType.LawsuitDeck]: hideItemId
    }
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves: MaterialMove[] = []

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      new MemoryHelper(this.game).clearMemory()
    }

    return moves
  }

  itemsCanMerge(type: MaterialType) {
    return type !== MaterialType.LawsuitPiece && super.itemsCanMerge(type)
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
