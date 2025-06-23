import { MaterialMove } from '@gamepark/rules-api'
import { GiftActionRule } from './actions/GiftActionRule'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'
import { MemoryHelper } from './helper/MemoryHelper'

export class Choose1ProductRule extends GiftActionRule {
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
