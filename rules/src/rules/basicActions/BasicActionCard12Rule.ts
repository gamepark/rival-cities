import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { GiftActionRule } from '../actions/GiftActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard12Rule extends PlayerTurnRule {
  giftActionRule = new GiftActionRule(this.game)
  advanceLawsuitActionRule = new AdvanceLawsuitActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  getPlayerMoves(): MaterialMove[] {
    if(!this.actionChoosen) {
      return this.giftActionRule.getPlayerMoves(this.advanceLawsuitActionRule.getPlayerMoves())
    }
    if (this.actionChoosen === ActionType.Gift) {
      return this.giftActionRule.getPlayerMoves()
    }
    if (this.actionChoosen === ActionType.AdvanceLawsuit) {
      return this.advanceLawsuitActionRule.getPlayerMoves()
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.giftActionRule.beforeItemMove(move), ...this.advanceLawsuitActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.actionChoosen === ActionType.Gift) {
      return this.giftActionRule.afterItemMove(move)
    }
    if (this.actionChoosen === ActionType.AdvanceLawsuit) {
      return this.advanceLawsuitActionRule.afterItemMove(move)
    }
    return []
  }
}
