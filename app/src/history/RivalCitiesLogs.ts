import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { isMoveItem, MaterialGame, MaterialMove } from '@gamepark/rules-api'
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
    const game = context.game as MaterialGame
    const ruleId = game.rule?.id
    const actionPlayer = context.action.playerId
    if (isMoveItem(move) && move.location.type === LocationType.PlayerProducts) {
      return {
        Component: ruleId === RuleId.Piracy ? StealProductHistory : GetProductHistory,
        player: move.location.player
      }
    }
    if (this.getMoveLocationType(move) === LocationType.ProductPiles) {
      return {
        Component: PayProductHistory,
        player: actionPlayer
      }
    }
    if (isMoveItem(move) && move.location.type === LocationType.PlayerLetterDeck) {
      return {
        Component: GetLetterHistory,
        player: move.location.player
      }
    }
    if (this.getMoveLocationType(move) === LocationType.LetterDeck) {
      return {
        Component: PayLetterHistory,
        player: actionPlayer
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
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.AllianceSpace) {
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
    if (isMoveItem(move) && move.location.type === LocationType.PlayerLawsuitCards) {
      return {
        Component: WinLawsuitHistory,
        player: move.location.player
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

    if (isMoveItem(move) && move.location.type === LocationType.LawsuitMarkerSpace) {
      const card = new RivalCitiesRules(game).material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).parent(move.location.parent)
      if (card.length)
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
