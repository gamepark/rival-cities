import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { AdvanceLawsuitActionRule } from '../actions/AdvanceLawsuitActionRule'
import { GiftActionRule } from '../actions/GiftActionRule'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class BasicActionCard12Rule extends PlayerTurnRule {
  giftActionRule = new GiftActionRule(this.game)
  advanceLawsuitActionRule = new AdvanceLawsuitActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  onRuleStart(): MaterialMove[] {
    this.computeActionIfPlayerHasGdanskAlliance()
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.giftActionRule.actionType)) {
      moves.push(...this.giftActionRule.getPlayerMoves())
    }
    if (!this.playerHasGdanskAlliance || this.remind(MemoryType.ComputedActions).includes(this.advanceLawsuitActionRule.actionType)) {
      moves.push(...this.advanceLawsuitActionRule.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.giftActionRule.beforeItemMove(move), ...this.advanceLawsuitActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    return [...this.giftActionRule.afterItemMove(move), ...this.advanceLawsuitActionRule.afterItemMove(move)]
  }
      
  computeActionIfPlayerHasGdanskAlliance() {
    if(this.playerHasGdanskAlliance) {
      this.memorize(MemoryType.ComputedActions, [this.giftActionRule.actionType, this.advanceLawsuitActionRule.actionType])
    }
  }

  get playerHasGdanskAlliance() {
    return new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceGdansk)
  }
}
