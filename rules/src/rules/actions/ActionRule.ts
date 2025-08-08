import { CustomMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Action } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export abstract class ActionRule<E extends Action = Action> extends PlayerTurnRule {
  action: E

  constructor(game: MaterialGame, action?: E) {
    super(game)
    this.action = action ?? (this.actions[0] as E)
  }

  get actions(): Action[] {
    return this.remind<Action[]>(MemoryType.Actions)
  }

  endAction() {
    return this.customMove(CustomMoveType.EndAction, this.action)
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Pass || move.type === CustomMoveType.EndAction) {
      return this.removeActionAndMove()
    }
    return []
  }

  removeActionAndMove() {
    this.actions.shift()
    return this.moveToNextAction()
  }

  startAction(action: Action) {
    this.actions.unshift(action)
    return this.moveToNextAction()
  }

  addActionBonus(action: Action) {
    this.actions.splice(1, 0, action)
  }

  moveToNextAction() {
    if (this.actions.length === 0) {
      const pendingRule = this.remind(MemoryType.PendingRule)
      if (pendingRule) {
        this.forget(MemoryType.PendingRule)
        return [this.startRule(pendingRule)]
      }
      return [this.startRule(RuleId.ConfirmEndTurn)]
    }

    const nextAction = this.actions[0]
    if (nextAction.type === ActionType.EarnPrestige && nextAction.playerWhoEarnedPrestige !== this.player) {
      return [this.startPlayerTurn(ActionRuleIds[this.actions[0].type], this.nextPlayer)]
    }
    if (nextAction.type === ActionType.Multiple && nextAction.player && nextAction.player !== this.player) {
      return [this.startPlayerTurn(ActionRuleIds[this.actions[0].type], this.nextPlayer)]
    }

    return [this.startRule(ActionRuleIds[this.actions[0].type])]
  }
}
