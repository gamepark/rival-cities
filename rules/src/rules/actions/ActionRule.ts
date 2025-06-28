import { MaterialGame, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { RuleMove } from '@gamepark/rules-api/dist/material/moves'
import { RuleStep } from '@gamepark/rules-api/dist/material/rules/RuleStep'
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

  onRuleStart(_move?: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    return []
  }

  getAutomaticActionMoves(): MaterialMove[] {
    return []
  }

  get actions(): Action[] {
    return this.remind<Action[]>(MemoryType.Actions)
  }

  removeAction() {
    this.forget(MemoryType.BasicActionChoosen)
    const firstAction = this.actions[0]
    if (firstAction.type === ActionType.Computed && this.action?.type !== ActionType.Computed) {
      firstAction.actions = firstAction.actions.filter((it) => it.type !== this.action?.type)
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
      return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer)]
    }

    return [this.startRule(ActionRuleIds[this.actions[0].type])]
  }

  checkAnotherActionInProgress(actionType?: ActionType) {
    return this.remind(MemoryType.BasicActionChoosen) && this.remind(MemoryType.BasicActionChoosen) !== actionType
  }
}
