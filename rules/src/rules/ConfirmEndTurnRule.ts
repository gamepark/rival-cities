import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class ConfirmEndTurnRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    return [this.customMove(CustomMoveType.ConfirmEndTurn)]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.ConfirmEndTurn)(move)) {
      return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer)]
    }
    return []
  }
}
