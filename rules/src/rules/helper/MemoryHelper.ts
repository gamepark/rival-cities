import { MaterialRulesPart } from '@gamepark/rules-api'
import { MemoryType } from '../MemoryType'

export class MemoryHelper extends MaterialRulesPart {
  clearMemory(): void {
    this.memorize(MemoryType.Count, 0)
    this.memorize(MemoryType.IsProductReturn, false)
    this.memorize(MemoryType.IsBuildInProgress, false)
    this.memorize(MemoryType.CounterActions, 0)
    this.memorize(MemoryType.IsDonationInProgress, false)
    this.forget(MemoryType.ProductChosen)
  }
}
