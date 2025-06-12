import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { EarnPrestigeActionRule } from '../actions/EarnPrestigeActionRule'
import { FormAllianceActionRule } from '../actions/FormAllianceActionRule'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'

export class BasicActionCard10Rule extends PlayerTurnRule {
  formAllianceActionRule = new FormAllianceActionRule(this.game)
  earnPrestigeActionRule = new EarnPrestigeActionRule(this.game)
  actionChoosen = this.remind(MemoryType.BasicActionChoosen)

  getPlayerMoves(): MaterialMove[] {
    if (!this.actionChoosen) {
      return [...this.formAllianceActionRule.getPlayerMoves(), ...this.earnPrestigeActionRule.getPlayerMoves()]
    }
    if (this.actionChoosen === ActionType.FormAlliance) {
      return this.formAllianceActionRule.getPlayerMoves()
    }
    if (this.actionChoosen === ActionType.EarnPrestige) {
      return this.earnPrestigeActionRule.getPlayerMoves()
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return [...this.formAllianceActionRule.beforeItemMove(move), ...this.earnPrestigeActionRule.beforeItemMove(move)]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.actionChoosen === ActionType.FormAlliance) {
      return this.formAllianceActionRule.afterItemMove(move)
    }
    if (this.actionChoosen === ActionType.EarnPrestige) {
      return this.earnPrestigeActionRule.afterItemMove(move)
    }
    return []
  }
}
