import {
  CompetitiveRank,
  CustomMove,
  hideItemId,
  hideItemIdToOthers,
  isCustomMoveType,
  isMoveItemType,
  ItemMove,
  MaterialGame,
  MaterialMove,
  MaterialMoveRandomized,
  MaterialMoveView,
  PlayMoveContext,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  StackingStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { City, getRival } from './City'
import { Action, ActionType } from './material/Action'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { AdvanceLawsuitRule } from './rules/actions/AdvanceLawsuitRule'
import { BuildFactoryRule } from './rules/actions/BuildFactoryRule'
import { ChooseSplitActionRule } from './rules/actions/ChooseSplitActionRule'
import { CourtRulingRule } from './rules/actions/CourtRulingRule'
import { DonationRule } from './rules/actions/DonationRule'
import { DrawSpecialActionCardRule } from './rules/actions/DrawSpecialActionCardRule'
import { EarnPrestigeRule } from './rules/actions/EarnPrestigeRule'
import { FormAllianceRule } from './rules/actions/FormAllianceRule'
import { GainLetterRule } from './rules/actions/GainLetterRule'
import { GiftRule } from './rules/actions/GiftRule'
import { PerformMultipleActionsRule } from './rules/actions/PerformMultipleActionsRule'
import { PiracyRule } from './rules/actions/PiracyRule'
import { ProductionRule } from './rules/actions/ProductionRule'
import { ProductSwapRule } from './rules/actions/ProductSwapRule'
import { PurchaseShipRule } from './rules/actions/PurchaseShipRule'
import { ReactivateFactoryRule } from './rules/actions/ReactivateFactoryRule'
import { ResolveLawsuitRule } from './rules/actions/ResolveLawsuitRule'
import { AdvanceInkJarRule } from './rules/AdvanceInkJarRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseFirstProductRule } from './rules/ChooseFirstProductRule'
import { ChooseSpecialActionRule } from './rules/ChooseSpecialActionRule'
import { ConfirmEndTurnRule } from './rules/ConfirmEndTurnRule'
import { CustomMoveType } from './rules/CustomMoveType'
import { EndOfGameHelper } from './rules/helper/EndOfGameHelper'
import { MemoryHelper } from './rules/helper/MemoryHelper'
import { MemoryType } from './rules/MemoryType'
import { OffSeasonChangeSpecialCardsRule } from './rules/OffSeason/OffSeasonChangeSpecialCardsRule'
import { OffSeasonGetPrestigeBonusesRule } from './rules/OffSeason/OffSeasonGetPrestigeBonusesRule'
import { OffSeasonGetShipsBonusesRule } from './rules/OffSeason/OffSeasonGetShipsBonusesRule'
import { OffSeasonPayForAllianceRule } from './rules/OffSeason/OffSeasonPayForAllianceRule'
import { OffSeasonPlayerWithMostShipCardsEarnPrestigeRule } from './rules/OffSeason/OffSeasonPlayerWithMostShipCardsEarnPrestigeRule'
import { OffSeasonReactivateFactoriesRule } from './rules/OffSeason/OffSeasonReactivateFactoriesRule'
import { OffSeasonReturnBellRule } from './rules/OffSeason/OffSeasonReturnBellRule'
import { OffSeasonTakeBellRule } from './rules/OffSeason/OffSeasonTakeBellRule'
import { PayInkJarMovementCostRule } from './rules/PayInkJarMovementCostRule'
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
    [RuleId.PayInkJarMovementCost]: PayInkJarMovementCostRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.ChooseSplitAction]: ChooseSplitActionRule,
    [RuleId.PerformMultipleActions]: PerformMultipleActionsRule,
    [RuleId.ResolveLawsuit]: ResolveLawsuitRule,
    [RuleId.AdvanceLawsuit]: AdvanceLawsuitRule,
    [RuleId.DrawSpecialActionCard]: DrawSpecialActionCardRule,
    [RuleId.EarnPrestige]: EarnPrestigeRule,
    [RuleId.GainLetter]: GainLetterRule,
    [RuleId.OffSeasonTakeBell]: OffSeasonTakeBellRule,
    [RuleId.OffSeasonPayForAlliance]: OffSeasonPayForAllianceRule,
    [RuleId.OffSeasonGetShipsBonuses]: OffSeasonGetShipsBonusesRule,
    [RuleId.OffSeasonGetPrestigeBonuses]: OffSeasonGetPrestigeBonusesRule,
    [RuleId.OffSeasonChangeSpecialCards]: OffSeasonChangeSpecialCardsRule,
    [RuleId.OffSeasonReactivateFactories]: OffSeasonReactivateFactoriesRule,
    [RuleId.OffSeasonPlayerWithMostShipCardsEarnPrestige]: OffSeasonPlayerWithMostShipCardsEarnPrestigeRule,
    [RuleId.OffSeasonReturnBell]: OffSeasonReturnBellRule,
    [RuleId.ChooseSpecialAction]: ChooseSpecialActionRule,
    [RuleId.Piracy]: PiracyRule,
    [RuleId.PurchaseShip]: PurchaseShipRule,
    [RuleId.BuildFactory]: BuildFactoryRule,
    [RuleId.Donation]: DonationRule,
    [RuleId.FormAlliance]: FormAllianceRule,
    [RuleId.Gift]: GiftRule,
    [RuleId.ProductSwap]: ProductSwapRule,
    [RuleId.ReactivateFactory]: ReactivateFactoryRule,
    [RuleId.CourtRuling]: CourtRulingRule,
    [RuleId.Production]: ProductionRule,
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
      [LocationType.AllianceSpace]: new StackingStrategy(),
      [LocationType.PlayerAlliances]: new PositiveSequenceStrategy()
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

  play(move: MaterialMoveRandomized | MaterialMoveView, context?: PlayMoveContext): MaterialMove[] {
    if (this.game.rule?.id === RuleId.PerformMultipleActions) {
      new PerformMultipleActionsRule(this.game).play(move)
    } else if (this.game.rule?.id === RuleId.ChooseSplitAction) {
      new ChooseSplitActionRule(this.game).play(move)
    }
    return super.play(move, context)
  }

  getLegalMoves(player: City) {
    const legalMoves = super.getLegalMoves(player)
    const letters = this.material(MaterialType.Letter).player(player)
    if (this.isTurnToPlay(player) && letters.getQuantity() > 0) {
      legalMoves.push(this.customMove(CustomMoveType.SpendLetterToSwapProduct, player))
    }
    return legalMoves
  }

  protected afterItemMove(move: ItemMove) {
    const consequences: MaterialMove[] = []
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if (!this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDeck).length) {
        const discard = this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDiscard)
        if (discard.length) {
          consequences.push(discard.moveItemsAtOnce({ type: LocationType.SpecialActionCardsDeck }))
          consequences.push(discard.shuffle())
        }
      }
    }
    if (isMoveItemType(MaterialType.PrestigeMarker)(move) && Math.abs(move.location.x!) >= 8) {
      return [this.endGame()]
    } else if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      const player = move.location.player!
      const ships = this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards)
      if (ships.player(player).length >= ships.player(getRival(player)).length + 3) {
        return [this.endGame()]
      }
    }
    consequences.push(...super.afterItemMove(move))
    return consequences
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      new MemoryHelper(this.game).clearMemory()
    }
    if (move.type === CustomMoveType.SpendLetterToSwapProduct) {
      const letters = this.material(MaterialType.Letter).player(move.data as City)
      const actions = this.memorize<Action[]>(MemoryType.Actions, (actions) => [{ type: ActionType.ProductSwap, nbPossibleSwaps: 1 }, ...actions])
      if (actions.length === 1) {
        this.memorize(MemoryType.PendingRule, this.game.rule?.id)
      }
      return [letters.moveItem({ type: LocationType.LetterDeck }), this.startRule(RuleId.ProductSwap)]
    }

    return super.onCustomMove(move)
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
