import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'
import { NextRuleHelper } from './NextRuleHelper'
import { CustomMoveType } from '../CustomMoveType'

export class ComputedActionsHelper extends MaterialRulesPart {
  player?: number
  previousRulePlayer?: number
  nextRuleHelper = new NextRuleHelper(this.game)
  constructor(game: MaterialGame, previousRulePlayer?: number) {
    super(game)
    this.player = game.rule?.player
    this.previousRulePlayer = previousRulePlayer
  }

  removeActionAndWait(actionType: ActionType): MaterialMove[] {
    this.memorize<ActionType[]>(MemoryType.ComputedActions, (old) => {
      const index = old.indexOf(actionType)
      if (index !== -1) {
        old.splice(index, 1)
      }
      return old
    })
    if(this.remind(MemoryType.ComputedActions).length) {
      return [this.previousRulePlayer !== undefined ? this.startPlayerTurn(this.remind(MemoryType.PreviousRule), this.previousRulePlayer!) : this.customMove(CustomMoveType.Wait)]
    }
    return this.nextRuleHelper.moveToNextRule()
  }
}
