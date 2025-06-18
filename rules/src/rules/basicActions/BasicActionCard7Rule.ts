import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { PurchaseShipActionRule } from '../actions/PurchaseShipActionRule'
import { MemoryType } from '../MemoryType'
import { MaterialType } from '../../material/MaterialType'
import { AllianceCard } from '../../material/AllianceCard'
import { LocationType } from '../../material/LocationType'

export class BasicActionCard7Rule extends PlayerTurnRule {
  purchaseShipActionRule = new PurchaseShipActionRule(this.game)
  advanceLawsuitActionRule = new AdvanceLawsuitActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  onRuleStart(): MaterialMove[] {
    this.computeActionIfPlayerHasGdanskAlliance()
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
    
  computeActionIfPlayerHasGdanskAlliance() {
    if(this.playerHasGdanskAlliance) {
      this.memorize(MemoryType.ComputedActions, [this.purchaseShipActionRule.actionType, this.advanceLawsuitActionRule.actionType])
    }
  }

  get playerHasGdanskAlliance() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceGdansk).length > 0
  }
}
