import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CourtRulingActionRule } from '../actions/CourtRulingActionRule'
import { PurchaseShipActionRule } from '../actions/PurchaseShipActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard13Rule extends PlayerTurnRule {
  courtRulingActionRule = new CourtRulingActionRule(this.game)
  purchaseShipActionRule = new PurchaseShipActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  getPlayerMoves(): MaterialMove[] {
    if(!this.actionChoosen) {
      return this.purchaseShipActionRule.getPlayerMoves(this.courtRulingActionRule.getPlayerMoves())
    }
    if (this.actionChoosen === ActionType.CourtRuling) {
      return this.courtRulingActionRule.getPlayerMoves()
    }
    if (this.actionChoosen === ActionType.PurchaseShip) {
      return this.purchaseShipActionRule.getPlayerMoves()
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.courtRulingActionRule.beforeItemMove(move), ...this.purchaseShipActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.actionChoosen === ActionType.CourtRuling) {
      return this.courtRulingActionRule.afterItemMove(move)
    }
    if (this.actionChoosen === ActionType.PurchaseShip) {
      return this.purchaseShipActionRule.afterItemMove(move)
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    return this.courtRulingActionRule.onCustomMove(move)
  }

  onRuleEnd(): MaterialMove[] {
    return this.purchaseShipActionRule.onRuleEnd()
  }
}
