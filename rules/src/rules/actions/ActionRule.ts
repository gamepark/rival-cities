import { MaterialGame, PlayerTurnRule } from '@gamepark/rules-api'
import { Action } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export abstract class ActionRule<E extends Action = Action> extends PlayerTurnRule {
  action?: E

  constructor(game: MaterialGame, action?: E) {
    super(game)
    this.action = action ?? (this.actions[0] as E)
  }

  get actions(): Action[] {
    return this.remind<Action[]>(MemoryType.Actions)
  }

  removeAction() {
    this.forget(MemoryType.BasicActionChosen)
    const firstAction = this.actions[0]
    if (firstAction?.type === ActionType.Computed && this.action?.type !== ActionType.Computed) {
      firstAction.actions = firstAction.actions?.filter((it) => !this.isSameAction(it as E)) ?? []
      if (firstAction.actions.length === 0) {
        this.memorize<Action[]>(MemoryType.Actions, (old) => old.splice(1))
      } else {
        this.memorize<Action[]>(MemoryType.Actions, (old) => [firstAction, ...old.splice(1)])
      }
    } else {
      this.memorize<Action[]>(MemoryType.Actions, (old) => old.splice(1))
    }
  }

  removeActionAndMove() {
    this.removeAction()
    return this.moveToNextAction()
  }

  addActionBonusAndMove(actionToAdd: Action) {
    this.addActionBonus(actionToAdd)
    return this.moveToNextAction()
  }

  addActionBonus(actionToAdd: Action) {
    this.memorize<Action[]>(MemoryType.Actions, (old) => [actionToAdd, ...old])
  }

  moveToNextAction() {
    if (this.actions.length === 0) {
      if (this.remind(MemoryType.OffSeasonStep)) {
        return [this.startRule(this.remind(MemoryType.OffSeasonStep))]
      }
      return [this.startRule(RuleId.ConfirmEndTurn)]
    }

    const nextAction = this.actions[0]
    if (nextAction.type === ActionType.EarnPrestige && nextAction.playerWhoEarnedPrestige !== this.player) {
      return [this.startPlayerTurn(ActionRuleIds[this.actions[0].type], this.nextPlayer)]
    }
    if (nextAction.type === ActionType.Computed && nextAction.player && nextAction.player !== this.player) {
      return [this.startPlayerTurn(ActionRuleIds[this.actions[0].type], this.nextPlayer)]
    }

    return [this.startRule(ActionRuleIds[this.actions[0].type])]
  }

  checkAnotherActionInProgress(actionType?: ActionType) {
    const chosenAction = this.remind<ActionType | undefined>(MemoryType.BasicActionChosen)
    return chosenAction !== undefined && chosenAction !== actionType
  }

  isSameAction(action: Action) {
    switch (action.type) {
      case ActionType.Production:
        return this.action?.type === ActionType.Production && this.action.productType === action.productType && this.action.quantity === action.quantity
      case ActionType.AdvanceLawsuit:
        return (
          this.action?.type === ActionType.AdvanceLawsuit &&
          this.action.lawsuitAdvancedLocation === action.lawsuitAdvancedLocation &&
          this.action.nbTimeAlreadyAdvanced === action.nbTimeAlreadyAdvanced &&
          this.action.playerCanUseAllianceLeHavre === action.playerCanUseAllianceLeHavre
        )
      case ActionType.BuildFactory:
        return this.action?.type === ActionType.BuildFactory && this.action.price === action.price
      case ActionType.Donation:
        return (
          this.action?.type === ActionType.Donation &&
          this.action.productType === action.productType &&
          this.action.nbProduct === action.nbProduct &&
          this.action.nbStars === action.nbStars &&
          this.action.nbTimes === action.nbTimes
        )
      case ActionType.DrawSpecialActionCard:
        return (
          this.action?.type === ActionType.DrawSpecialActionCard &&
          this.action.nbCardsToDraw === action.nbCardsToDraw &&
          this.action.playerCanUseAllianceKjjobenhavn === action.playerCanUseAllianceKjjobenhavn
        )
      case ActionType.EarnPrestige:
        return (
          this.action?.type === ActionType.EarnPrestige &&
          this.action.playerWhoEarnedPrestige === action.playerWhoEarnedPrestige &&
          this.action.playerCanUseAllianceBruxelles === action.playerCanUseAllianceBruxelles &&
          this.action.playerCanUseShip16 === action.playerCanUseShip16
        )
      case ActionType.OpponentEarnPrestige:
        return this.action?.type === ActionType.OpponentEarnPrestige
      case ActionType.FormAlliance:
        return this.action?.type === ActionType.FormAlliance
      case ActionType.GainLetter:
        return this.action?.type === ActionType.GainLetter && this.action.nbLettersToTake === action.nbLettersToTake
      case ActionType.Gift:
        return (
          this.action?.type === ActionType.Gift &&
          this.action.productType === action.productType &&
          this.action.nbProductToTake === action.nbProductToTake &&
          this.action.canUseAlliance === action.canUseAlliance
        )
      case ActionType.ProductSwap:
        return this.action?.type === ActionType.ProductSwap && this.action.nbPossibleSwaps === action.nbPossibleSwaps
      case ActionType.PurchaseShip:
        return this.action?.type === ActionType.PurchaseShip
      case ActionType.CourtRuling:
        return this.action?.type === ActionType.CourtRuling
      case ActionType.ReturnFactory:
        return this.action?.type === ActionType.ReturnFactory && this.action.nbFactoryCanReturn === action.nbFactoryCanReturn
      case ActionType.Piracy:
        return this.action?.type === ActionType.Piracy && this.action.nbProductsToSteal === action.nbProductsToSteal
      case ActionType.ResolveLawsuit:
        return this.action?.type === ActionType.ResolveLawsuit
      case ActionType.ChooseSpecialActionCard:
        return this.action?.type === ActionType.ChooseSpecialActionCard
      case ActionType.PayToPerformActionAgain:
        return (
          this.action?.type === ActionType.PayToPerformActionAgain &&
          this.action.productType === action.productType &&
          this.action.price === action.price &&
          this.action.actionToPerformAgain === action.actionToPerformAgain
        )
      default:
        return false
    }
  }
}
