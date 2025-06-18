import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CourtRulingActionRule } from '../actions/CourtRulingActionRule'
import { PurchaseShipActionRule } from '../actions/PurchaseShipActionRule'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class BasicActionCard13Rule extends PlayerTurnRule {
  courtRulingActionRule = new CourtRulingActionRule(this.game)
  purchaseShipActionRule = new PurchaseShipActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  onRuleStart(): MaterialMove[] {
    this.computeActionIfPlayerHasGdanskAlliance()
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
    
  computeActionIfPlayerHasGdanskAlliance() {
    if(this.playerHasGdanskAlliance) {
      this.memorize(MemoryType.ComputedActions, [this.courtRulingActionRule.actionType, this.purchaseShipActionRule.actionType])
    }
  }

  get playerHasGdanskAlliance() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceGdansk).length > 0
  }
}
