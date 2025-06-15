import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class NextRuleHelper extends MaterialRulesPart {
  player?: number
  nextPlayer?: number
  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
    this.nextPlayer = game.players.find((player) => player !== this.player)
  }

  moveToNextRule() {
    const nextRules: RuleId[] = this.remind(MemoryType.NextRules)
    if (nextRules.length > 0) {
      this.memorize(MemoryType.NextRules, nextRules.slice(1))
      return [this.startRule(nextRules[0])]
    }
    return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer!)]
  }
}
