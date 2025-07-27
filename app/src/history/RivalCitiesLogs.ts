import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { isMoveItem, MaterialMove } from '@gamepark/rules-api'
import { AdvanceInLawsuitHistory } from './components/AdvanceInLawsuitHistory'
import { GainPrestigeHistory } from './components/GainPrestigeHistory'
import { GetAllianceHistory } from './components/GetAllianceHistory'
import { GetFactoryHistory } from './components/GetFactoryHistory'
import { GetLetterHistory } from './components/GetLetterHistory'
import { GetProductHistory } from './components/GetProductHistory'
import { GetShipHistory } from './components/GetShipHistory'
import { GetSpecialCardHistory } from './components/GetSpecialCardHistory'
import { GetStarTokenHistory } from './components/GetStarTokenHistory'
import { PayLetterHistory } from './components/PayLetterHistory'
import { PayProductHistory } from './components/PayProductHistory'
import { ReturnAllianceHistory } from './components/ReturnAllianceHistory'
import { StealProductHistory } from './components/StealProductHistory'
import { UseFactoryHistory } from './components/UseFactoryHistory'
import { WinLawsuitHistory } from './components/WinLawsuitHistory'

export class RivalCitiesLogs implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext): MovePlayedLogDescription | undefined {
    const ruleId: RuleId = context.game.rule.id
    const actionPlayer = context.action.playerId
    if (this.getMoveLocationType(move) === LocationType.PlayerProducts) {
      return {
        Component: ruleId === RuleId.Piracy ? StealProductHistory : GetProductHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.ProductPiles) {
      return {
        Component: PayProductHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerLetterDeck) {
      return {
        Component: GetLetterHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.LetterDeck) {
      return {
        Component: PayLetterHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerStarTokens) {
      return {
        Component: GetStarTokenHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerFactories) {
      if (isMoveItem(move) && move.location.rotation) {
        return {
          Component: UseFactoryHistory,
          player: actionPlayer
        }
      }
      if (ruleId === RuleId.BuildFactory) {
        return {
          Component: GetFactoryHistory,
          player: actionPlayer
        }
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerAllianceCards) {
      return {
        Component: GetAllianceHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.AllianceCardsLayout) {
      return {
        Component: ReturnAllianceHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerShipCards) {
      return {
        Component: GetShipHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerLawsuitCards) {
      return {
        Component: WinLawsuitHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerSpecialActionCardsHand) {
      return {
        Component: GetSpecialCardHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PrestigeMarkerPiste) {
      return {
        Component: GainPrestigeHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.LawsuitMarkerPiste && ruleId === RuleId.AdvanceLawsuit) {
      return {
        Component: AdvanceInLawsuitHistory,
        player: actionPlayer
      }
    }
    return undefined
  }

  getMoveLocationType(move: MaterialMove) {
    return isMoveItem(move) ? move.location.type : undefined
  }
}
