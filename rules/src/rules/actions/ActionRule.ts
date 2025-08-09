import { CustomMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { Action } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export abstract class ActionRule<A extends Action> extends PlayerTurnRule {
  action: A

  constructor(game: MaterialGame, action?: A) {
    super(game)
    this.action = action ?? (this.actions[0] as A)
  }

  get actions(): Action[] {
    return this.remind<Action[]>(MemoryType.Actions)
  }

  endAction() {
    return this.customMove(CustomMoveType.EndAction)
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Pass || move.type === CustomMoveType.EndAction) {
      return [this.startNextRule()]
    }
    return []
  }

  addActions(...action: Action[]) {
    this.actions.splice(1, 0, ...action)
  }

  startNextRule() {
    const isRivalTurn = this.actions[0]?.isRivalTurn
    const willBeRivalTurn = this.actions[1]?.isRivalTurn
    if ((!isRivalTurn && !willBeRivalTurn) || (isRivalTurn && willBeRivalTurn)) {
      return this.startRule(this.nextRuleId)
    } else {
      return this.startPlayerTurn(this.nextRuleId, getRival(this.player))
    }
  }

  get nextRuleId() {
    if (this.actions.length < 2) {
      const pendingRule = this.remind<RuleId | undefined>(MemoryType.PendingRule)
      if (pendingRule) {
        this.forget(MemoryType.PendingRule)
        return pendingRule
      }
      return RuleId.ConfirmEndTurn
    }
    return ActionRuleIds[this.actions[1].type]
  }

  hasAlliance(alliance: Alliance, player = this.player) {
    return this.material(MaterialType.AllianceCard).id(alliance).getItem()?.location.player === player
  }

  onRuleEnd() {
    this.memorize<Action[]>(MemoryType.Actions, (actions) => actions.slice(1))
    return []
  }
}
