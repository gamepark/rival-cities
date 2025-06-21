import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ActionType } from '../ActionType'
import { MemoryType } from '../MemoryType'
import { NextRuleHelper } from './NextRuleHelper'
import { RuleId } from '../RuleId'

export class ComputedActionsHelper extends MaterialRulesPart {
  player?: number
  previousRulePlayer?: number
  nextRuleHelper = new NextRuleHelper(this.game)
  constructor(game: MaterialGame, previousRulePlayer?: number) {
    super(game)
    this.player = game.rule?.player
    this.previousRulePlayer = previousRulePlayer
  }

  removeActionAndnext(actionType?: ActionType): MaterialMove[] {    
    this.forget(MemoryType.BasicActionChoosen)
    const BonusesRules: RuleId[] = this.remind(MemoryType.BonusesRules)
    if (BonusesRules.length > 0) {
      this.memorize(MemoryType.BonusesRules, BonusesRules.slice(1))
      return [this.startRule(BonusesRules[0])]
    }
    if(actionType) {
      this.memorize<ActionType[]>(MemoryType.ComputedActions, (old) => {
        const index = old.indexOf(actionType)
        if (index !== -1) {
          old.splice(index, 1)
        }
        return old
      })
    }
    if (this.remind(MemoryType.ComputedActions).length) {
      return [
        this.previousRulePlayer !== undefined
          ? this.startPlayerTurn(this.remind(MemoryType.PreviousRule), this.previousRulePlayer)
          : this.startRule(this.remind(MemoryType.PreviousRule))
      ]
    }
    return this.nextRuleHelper.moveToNextRule()
  }
}
