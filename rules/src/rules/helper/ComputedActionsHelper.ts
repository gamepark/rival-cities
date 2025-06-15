import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { NextRuleHelper } from './NextRuleHelper'

export class ComputedActionsHelper extends MaterialRulesPart {
  player?: number
  nextRuleHelper = new NextRuleHelper(this.game)
  constructor(game: MaterialGame) {
    super(game)
    this.player = game.rule?.player
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
      return [this.customMove(CustomMoveType.Wait)]
    }
    return this.nextRuleHelper.moveToNextRule()
  }
}
