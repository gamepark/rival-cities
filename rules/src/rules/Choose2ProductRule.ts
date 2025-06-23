import { MaterialMove } from '@gamepark/rules-api'
import { Gift2TimeActionRule } from './actions/Gift2TimeActionRule'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'
import { MemoryHelper } from './helper/MemoryHelper'

export class Choose2ProductRule extends Gift2TimeActionRule {
  movesAfterProductsGiven(): MaterialMove[] {
    if (this.remind(MemoryType.IsOffSeason)) {
      this.forget(MemoryType.BasicActionChoosen)
      return [this.startRule(RuleId.OffSeasonChangeSpecialCards)]
    }
    return super.movesAfterProductsGiven()
  }

  onRuleEnd(): MaterialMove[] {
    if (this.remind(MemoryType.IsOffSeason)) {
      new MemoryHelper(this.game).clearMemory()
    }
    return []
  }
}
