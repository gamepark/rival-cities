import { LogDescription, MoveComponentContext } from '@gamepark/react-game'
import { MovePlayedLogDescription } from '@gamepark/react-game/dist/components/Log/LogDescription'
import { City } from '@gamepark/rival-cities/City'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { isMoveItem, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { AdvanceInLawsuitHistory } from './components/AdvanceInLawsuitHistory'
import { GainPrestigeHistory } from './components/GainPrestigeHistory'
import { GainProductHistory } from './components/GainProductHistory'
import { GetAllianceHistory } from './components/GetAllianceHistory'
import { GetFactoryHistory } from './components/GetFactoryHistory'
import { GetLetterHistory } from './components/GetLetterHistory'
import { GetShipHistory } from './components/GetShipHistory'
import { GetSpecialCardHistory } from './components/GetSpecialCardHistory'
import { GetStarTokenHistory } from './components/GetStarTokenHistory'
import { MoveInkJarHistory } from './components/MoveInkJarHistory'
import { PayLetterHistory } from './components/PayLetterHistory'
import { PayProductHistory } from './components/PayProductHistory'
import { ReturnAllianceHistory } from './components/ReturnAllianceHistory'
import { StealProductHistory } from './components/StealProductHistory'
import { UseFactoryHistory } from './components/UseFactoryHistory'
import { WinLawsuitHistory } from './components/WinLawsuitHistory'

export class RivalCitiesLogs implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext<MaterialMove, City, MaterialGame>): MovePlayedLogDescription | undefined {
    const { game, action } = context
    const ruleId = game.rule?.id
    if (ruleId === RuleId.ChooseStartProduct && isMoveItemType(MaterialType.Product)(move)) {
      return { Component: GainProductHistory, player: action.playerId }
    }
    if (ruleId === RuleId.AdvanceInkJar && isMoveItemType(MaterialType.InkJar)(move)) {
      return { Component: MoveInkJarHistory, player: action.playerId }
    }

    if (isMoveItem(move) && move.location.type === LocationType.PlayerProducts) {
      return {
        Component: ruleId === RuleId.Piracy ? StealProductHistory : GainProductHistory,
        player: move.location.player
      }
    }
    if (this.getMoveLocationType(move) === LocationType.ProductSupply) {
      return {
        Component: PayProductHistory,
        player: action.playerId
      }
    }
    if (isMoveItem(move) && move.location.type === LocationType.PlayerLetters) {
      return {
        Component: GetLetterHistory,
        player: move.location.player
      }
    }
    if (this.getMoveLocationType(move) === LocationType.LetterSupply) {
      return {
        Component: PayLetterHistory,
        player: action.playerId
      }
    }
    if (isMoveItem(move) && move.location.type === LocationType.PlayerStarTokens) {
      return {
        Component: GetStarTokenHistory,
        player: move.location.player
      }
    }
    if (isMoveItem(move) && move.location.type === LocationType.PlayerFactories) {
      if (move.location.rotation) {
        return {
          Component: UseFactoryHistory,
          player: move.location.player
        }
      }
      if (ruleId === RuleId.BuildFactory) {
        return {
          Component: GetFactoryHistory,
          player: move.location.player
        }
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerAlliances) {
      return {
        Component: GetAllianceHistory,
        player: action.playerId
      }
    }
    if (this.getMoveLocationType(move) === LocationType.AllianceSpace) {
      return {
        Component: ReturnAllianceHistory,
        player: action.playerId
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerShipCards) {
      return {
        Component: GetShipHistory,
        player: action.playerId
      }
    }
    if (isMoveItem(move) && move.location.type === LocationType.PlayerLawsuitCards) {
      return {
        Component: WinLawsuitHistory,
        player: move.location.player
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerHand) {
      return {
        Component: GetSpecialCardHistory,
        player: action.playerId
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PrestigeTrack) {
      return {
        Component: GainPrestigeHistory,
        player: action.playerId
      }
    }

    if (isMoveItem(move) && move.location.type === LocationType.LawsuitMarkerSpace) {
      const card = new RivalCitiesRules(game).material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).parent(move.location.parent)
      if (card.length)
        return {
          Component: AdvanceInLawsuitHistory,
          player: action.playerId
        }
    }
    return undefined
  }

  getMoveLocationType(move: MaterialMove) {
    return isMoveItem(move) ? move.location.type : undefined
  }
}
