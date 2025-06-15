import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DonationActionRule } from '../actions/DonationActionRule'
import { ProductSwapActionRule } from '../actions/ProductSwapActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard8Rule extends PlayerTurnRule {
  productSwapActionRule = new ProductSwapActionRule(this.game)
  donationActionRule = new DonationActionRule(this.game)

  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.ComputedActions, [ActionType.ProductSwap, ActionType.Donation])
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.remind(MemoryType.IsDonationInProgress) && this.remind<ActionType[]>(MemoryType.ComputedActions).includes(ActionType.ProductSwap)) {
      moves.push(...this.productSwapActionRule.getPlayerMoves())
    }
    if (!this.remind(MemoryType.IsProductReturn) && this.remind<ActionType[]>(MemoryType.ComputedActions).includes(ActionType.Donation)) {
      moves.push(...this.donationActionRule.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return this.donationActionRule.beforeItemMove(move)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves = []
    if (!this.remind(MemoryType.IsDonationInProgress)) {
      moves.push(...this.productSwapActionRule.afterItemMove(move))
    }
    moves.push(...this.donationActionRule.afterItemMove(move))
    return moves
  }
}
