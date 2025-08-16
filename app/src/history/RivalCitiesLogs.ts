import { LogDescription, MoveComponentContext } from '@gamepark/react-game'
import { MovePlayedLogDescription } from '@gamepark/react-game/dist/components/Log/LogDescription'
import { City } from '@gamepark/rival-cities/City'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { isCustomMoveType, isMoveItem, isMoveItemType, isMoveItemTypeAtOnce, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { AdvanceInLawsuitHistory } from './components/AdvanceInLawsuitHistory'
import { BuildFactoryHistory } from './components/BuildFactoryHistory'
import { DrawSpecialCardHistory } from './components/DrawSpecialCardHistory'
import { EndAllianceHistory } from './components/EndAllianceHistory'
import { FormAllianceHistory } from './components/FormAllianceHistory'
import { GainLetterHistory } from './components/GainLetterHistory'
import { GainPrestigeHistory } from './components/GainPrestigeHistory'
import { GainProductHistory } from './components/GainProductHistory'
import { GetShipHistory } from './components/GetShipHistory'
import { GetStarTokenHistory } from './components/GetStarTokenHistory'
import { MoveInkJarHistory } from './components/MoveInkJarHistory'
import { PayLetterHistory } from './components/PayLetterHistory'
import { PayProductHistory } from './components/PayProductHistory'
import { PlaySpecialCardHistory } from './components/PlaySpecialCardHistory'
import { ReactivateAllFactoryHistory } from './components/ReactivateAllFactoriesHistory'
import { ReactivateFactoryHistory } from './components/ReactivateFactoryHistory'
import { StealAllianceHistory } from './components/StealAllianceHistory'
import { StealLetterHistory } from './components/StealLetterHistory'
import { StealProductHistory } from './components/StealProductHistory'
import { TakeSpecialCardHistory } from './components/TakeSpecialCardHistory'
import { TriggerAllianceHistory } from './components/TriggerAllianceHistory'
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
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      if (move.location.type === LocationType.PlayerAlliances) {
        if (new RivalCitiesRules(game).material(MaterialType.AllianceCard).getItem(move.itemIndex).location.type === LocationType.AllianceSpace) {
          return { Component: FormAllianceHistory, depth: 1 }
        } else {
          return { Component: StealAllianceHistory, depth: 1 }
        }
      } else {
        return { Component: EndAllianceHistory, depth: 1 }
      }
    }
    if (isCustomMoveType(CustomMoveType.TriggerAllianceEffect)(move)) {
      return { Component: TriggerAllianceHistory, depth: 1 }
    }

    if (isMoveItemType(MaterialType.Product)(move)) {
      if (move.location.type === LocationType.PlayerProducts) {
        if (new RivalCitiesRules(game).material(MaterialType.Product).getItem(move.itemIndex).location.type === LocationType.ProductSupply) {
          return { Component: GainProductHistory, depth: 1 }
        } else {
          return { Component: StealProductHistory, depth: 1 }
        }
      } else {
        return { Component: PayProductHistory, depth: 1 }
      }
    }
    if (isMoveItemType(MaterialType.Letter)(move)) {
      if (move.location.type === LocationType.PlayerLetters) {
        if (new RivalCitiesRules(game).material(MaterialType.Letter).getItem(move.itemIndex).location.type === LocationType.LetterSupply) {
          return { Component: GainLetterHistory, depth: 1 }
        } else {
          return { Component: StealLetterHistory, depth: 1 }
        }
      } else {
        return { Component: PayLetterHistory, depth: 1 }
      }
    }
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if (move.location.type === LocationType.PlayerHand) {
        if (new RivalCitiesRules(game).material(MaterialType.SpecialActionCard).getItem(move.itemIndex).location.type === LocationType.ActionCardSpace) {
          return { Component: TakeSpecialCardHistory, depth: 1 }
        } else {
          return { Component: DrawSpecialCardHistory, depth: 1 }
        }
      } else if (move.location.type === LocationType.SpecialActionCardDiscard) {
        return { Component: PlaySpecialCardHistory, player: action.playerId }
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move)) {
      if (new RivalCitiesRules(game).material(MaterialType.Factory).getItem(move.itemIndex).location.type === LocationType.FactorySupply) {
        return { Component: BuildFactoryHistory, depth: 1 }
      } else if (move.location.rotation) {
        return { Component: UseFactoryHistory, depth: 2 }
      } else {
        return { Component: ReactivateFactoryHistory, depth: 1 }
      }
    }
    if (isMoveItemTypeAtOnce(MaterialType.Factory)(move)) {
      return { Component: ReactivateAllFactoryHistory, depth: 1 }
    }

    if (isMoveItem(move) && move.location.type === LocationType.PlayerStarTokens) {
      return {
        Component: GetStarTokenHistory,
        player: move.location.player
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
