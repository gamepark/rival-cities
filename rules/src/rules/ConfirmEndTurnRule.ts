import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class ConfirmEndTurnRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer)]
  }
}
