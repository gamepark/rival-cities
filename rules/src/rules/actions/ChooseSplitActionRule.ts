import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { ChoiceAction } from '../../material/Actions/Actions'
import { CustomMoveType } from '../CustomMoveType'
import { getActionRule } from '../helper/ActionHelper'
import { MemoryHelper } from '../helper/MemoryHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class ChooseSplitActionRule extends ActionRule<ChoiceAction> {
  onRuleStart(): MaterialMove[] {
    this.forget(MemoryType.ProductChosen)
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).getPlayerMoves())
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).beforeItemMove(move, context))
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).afterItemMove(move, context))
  }

  onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return this.removeActionAndMove()
    }
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).onCustomMove(move, context))
  }

  onRuleEnd(): MaterialMove[] {
    new MemoryHelper(this.game).clearMemory()
    return []
  }
}
