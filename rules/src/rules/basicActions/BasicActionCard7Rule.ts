import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { PurchaseShipActionRule } from '../actions/PurchaseShipActionRule'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class BasicActionCard7Rule extends PlayerTurnRule {
  purchaseShipActionRule = new PurchaseShipActionRule(this.game)
  advanceLawsuitActionRule = new AdvanceLawsuitActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)
  allianceCardHelper = new AllianceCardHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.allianceCardHelper.computeActionIfPlayerHasGdanskAlliance([this.purchaseShipActionRule.actionType, this.advanceLawsuitActionRule.actionType])
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.purchaseShipActionRule.actionType)) {
      moves.push(...this.purchaseShipActionRule.getPlayerMoves())
    }
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.advanceLawsuitActionRule.actionType)) {
      moves.push(...this.advanceLawsuitActionRule.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.purchaseShipActionRule.beforeItemMove(move), ...this.advanceLawsuitActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.purchaseShipActionRule.afterItemMove(move), ...this.advanceLawsuitActionRule.afterItemMove(move)]
  }

  get playerHasGdanskAlliance() {
    return new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceGdansk)
  }
}
