import { CustomMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { Action } from '../../material/Actions/Actions'
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
    const isRivalTurn = this.actions.shift()?.isRivalTurn
    return this.moveToNextAction(isRivalTurn)
  }

  startAction(action: Action) {
    this.actions.unshift(action)
    return this.moveToNextAction()
  }

  addActionBonus(...action: Action[]) {
    this.actions.splice(1, 0, ...action)
  }

  moveToNextAction(isRivalTurn?: boolean) {
    const willBeRivalTurn = this.actions[0]?.isRivalTurn
    if ((!isRivalTurn && !willBeRivalTurn) || (isRivalTurn && willBeRivalTurn)) {
      return [this.startRule(this.nextRuleId)]
    } else {
      return [this.startPlayerTurn(this.nextRuleId, getRival(this.player))]
    }
  }

  get nextRuleId() {
    if (this.actions.length === 0) {
      const pendingRule = this.remind<RuleId | undefined>(MemoryType.PendingRule)
      if (pendingRule) {
        this.forget(MemoryType.PendingRule)
        return pendingRule
      }
      return RuleId.ConfirmEndTurn
    }
    return ActionRuleIds[this.actions[0].type]
  }
}
