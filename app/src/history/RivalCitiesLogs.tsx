/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LogDescription, MoveComponentContext } from '@gamepark/react-game'
import { MovePlayedLogDescription } from '@gamepark/react-game/dist/components/Log/LogDescription'
import { City } from '@gamepark/rival-cities/City'
import { Action, ActionType } from '@gamepark/rival-cities/material/Action'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { GainPrestigeIncomeRule } from '@gamepark/rival-cities/rules/OffSeason/GainPrestigeIncomeRule'
import { GainShipsIncomeRule } from '@gamepark/rival-cities/rules/OffSeason/GainShipsIncomeRule'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import {
  isCustomMoveType,
  isMoveItem,
  isMoveItemType,
  isMoveItemTypeAtOnce,
  isStartPlayerTurn,
  isStartRule,
  MaterialGame,
  MaterialMove
} from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { AdvanceLawsuitHistory } from './components/AdvanceLawsuitHistory'
import { BuildFactoryHistory } from './components/BuildFactoryHistory'
import { DrawSpecialCardHistory } from './components/DrawSpecialCardHistory'
import { EarnPrestigeHistory } from './components/EarnPrestigeHistory'
import { EndAllianceHistory } from './components/EndAllianceHistory'
import { FormAllianceHistory } from './components/FormAllianceHistory'
import { GainLetterHistory } from './components/GainLetterHistory'
import { GainProductHistory } from './components/GainProductHistory'
import { GetStarTokenHistory } from './components/GetStarTokenHistory'
import { KeepAllianceHistory } from './components/KeepAllianceHistory'
import { LetterSwapHistory } from './components/LetterSwapHistory'
import { MoveInkJarHistory } from './components/MoveInkJarHistory'
import { OffSeasonEndHistory } from './components/OffSeasonEndHistory'
import { PassHistory } from './components/PassHistory'
import { PayLetterHistory } from './components/PayLetterHistory'
import { PayProductHistory } from './components/PayProductHistory'
import { PlaySpecialCardHistory } from './components/PlaySpecialCardHistory'
import { PrestigeIncomeHistory } from './components/PrestigeIncomeHistory'
import { PurchaseShipHistory } from './components/PurchaseShipHistory'
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
      const depth = this.getItemMoveDepth(game)
      if (move.location.type === LocationType.PlayerProducts) {
        if (new RivalCitiesRules(game).material(MaterialType.Product).getItem(move.itemIndex).location.type === LocationType.ProductSupply) {
          return { Component: GainProductHistory, depth }
        } else {
          return { Component: StealProductHistory, depth }
        }
      } else {
        return { Component: PayProductHistory, depth }
      }
    }
    if (isMoveItemType(MaterialType.Letter)(move)) {
      const depth = this.getItemMoveDepth(game)
      if (move.location.type === LocationType.PlayerLetters) {
        if (new RivalCitiesRules(game).material(MaterialType.Letter).getItem(move.itemIndex).location.type === LocationType.LetterSupply) {
          return { Component: GainLetterHistory, depth }
        } else {
          return { Component: StealLetterHistory, depth }
        }
      } else {
        return { Component: PayLetterHistory, depth }
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
      return { Component: ReactivateAllFactoryHistory }
    }

    if (isCustomMoveType(CustomMoveType.AdvanceLawsuit)(move)) {
      return { Component: AdvanceLawsuitHistory, depth: 1 }
    }
    if (isMoveItemType(MaterialType.LawsuitCard)(move) && move.location.type === LocationType.PlayerLawsuitCards) {
      return { Component: WinLawsuitHistory, depth: 1 }
    }

    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      return { Component: PurchaseShipHistory, depth: 1 }
    }

    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      return { Component: EarnPrestigeHistory, depth: 1 }
    }

    if (isCustomMoveType(CustomMoveType.SpendLetterToSwapProduct)(move)) {
      return { Component: LetterSwapHistory, depth: 1 }
    }

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return { Component: PassHistory, depth: 1 }
    }

    if (isStartRule(move) && move.id === RuleId.TakeBell) {
      return {
        Component: () => (
          <strong css={bigText}>
            <Trans defaults="history.off-season" />
          </strong>
        )
      }
    }
    if (isCustomMoveType(CustomMoveType.ChooseAlliance)(move)) {
      return { Component: KeepAllianceHistory, player: action.playerId }
    }
    if (ruleId === RuleId.PayAlliancesUpkeep && isStartPlayerTurn(move) && move.id === RuleId.EarnPrestige) {
      return { Component: () => <Trans defaults="history.ship.most" /> }
    }
    if (isStartRule(move) && move.id === RuleId.GainShipsIncome) {
      const rule = new GainShipsIncomeRule(game)
      if (rule.getIncome(City.Hamburg).length || rule.getIncome(City.Altona).length) {
        return { Component: () => <Trans defaults="history.ship.income" /> }
      }
    }
    if (isStartRule(move) && move.id === RuleId.GainPrestigeIncome) {
      const prestigeX = new GainPrestigeIncomeRule(game).material(MaterialType.PrestigeMarker).getItem()!.location.x!
      if (Math.abs(prestigeX) >= 2) {
        return { Component: PrestigeIncomeHistory, player: prestigeX < 0 ? City.Altona : City.Hamburg }
      }
    }
    if (isStartRule(move) && move.id === RuleId.ReplaceSpecialActionCards) {
      return { Component: () => <Trans defaults="history.special.replace" /> }
    }
    if (isMoveItemType(MaterialType.BellToken)(move) && move.location.type === LocationType.BellTokenSpot) {
      const player = new RivalCitiesRules(game).material(MaterialType.BellToken).getItem()!.location.player
      return { Component: OffSeasonEndHistory, player }
    }

    if (isMoveItem(move) && move.location.type === LocationType.PlayerStarTokens) {
      return {
        Component: GetStarTokenHistory,
        player: move.location.player
      }
    }
    return undefined
  }

  getItemMoveDepth(game: MaterialGame) {
    const rules = new RivalCitiesRules(game)
    const action = rules.remind<Action[]>(Memory.Actions)[0]
    if (!action) return 1
    switch (action.type) {
      case ActionType.GainProducts:
        return action.isGift ? 1 : 2
      case ActionType.AdvanceLawsuit:
      case ActionType.PurchaseShip:
        return 2
      default:
        return 1
    }
  }
}

const bigText = css`
  font-size: 1.5em;
`
