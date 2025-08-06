import { CustomMove, isCustomMoveType, ItemMove, MaterialMove } from '@gamepark/rules-api'
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

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).beforeItemMove(move))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).afterItemMove(move))
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.endAction()]
    } else if (move.type === CustomMoveType.EndAction) {
      return super.onCustomMove(move)
    }
    return this.action.actions.flatMap((action) => getActionRule(this.game, action).onCustomMove(move))
  }

  onRuleEnd(): MaterialMove[] {
    new MemoryHelper(this.game).clearMemory()
    return []
  }
}
