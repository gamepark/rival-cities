import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CourtRulingActionRule } from '../actions/CourtRulingActionRule'
import { PurchaseShipActionRule } from '../actions/PurchaseShipActionRule'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class BasicActionCard13Rule extends PlayerTurnRule {
  courtRulingActionRule = new CourtRulingActionRule(this.game)
  purchaseShipActionRule = new PurchaseShipActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)
  allianceCardHelper = new AllianceCardHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.allianceCardHelper.computeActionIfPlayerHasGdanskAlliance([this.courtRulingActionRule.actionType, this.purchaseShipActionRule.actionType])
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.courtRulingActionRule.actionType)) {
      moves.push(...this.courtRulingActionRule.getPlayerMoves())
    }
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.purchaseShipActionRule.actionType)) {
      moves.push(...this.purchaseShipActionRule.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.courtRulingActionRule.beforeItemMove(move), ...this.purchaseShipActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.courtRulingActionRule.afterItemMove(move), ...this.purchaseShipActionRule.afterItemMove(move)]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    return this.courtRulingActionRule.onCustomMove(move)
  }

  get playerHasGdanskAlliance() {
    return new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceGdansk)
  }
}
