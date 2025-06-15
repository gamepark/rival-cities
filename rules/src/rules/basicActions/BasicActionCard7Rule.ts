import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { PurchaseShipActionRule } from '../actions/PurchaseShipActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard7Rule extends PlayerTurnRule {
  purchaseShipActionRule = new PurchaseShipActionRule(this.game)
  advanceLawsuitActionRule = new AdvanceLawsuitActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  getPlayerMoves(): MaterialMove[] {
    if (!this.actionChoosen) {
      return this.purchaseShipActionRule.getPlayerMoves(this.advanceLawsuitActionRule.getPlayerMoves())
    }
    if (this.actionChoosen === ActionType.PurchaseShip) {
      return this.purchaseShipActionRule.getPlayerMoves()
    }
    if (this.actionChoosen === ActionType.AdvanceLawsuit) {
      return this.advanceLawsuitActionRule.getPlayerMoves()
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.purchaseShipActionRule.beforeItemMove(move), ...this.advanceLawsuitActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.actionChoosen === ActionType.PurchaseShip) {
      return this.purchaseShipActionRule.afterItemMove(move)
    }
    if (this.actionChoosen === ActionType.AdvanceLawsuit) {
      return this.advanceLawsuitActionRule.afterItemMove(move)
    }
    return []
  }
}
