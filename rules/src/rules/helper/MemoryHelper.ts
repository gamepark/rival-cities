import { MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from '../Memory'

export class MemoryHelper extends MaterialRulesPart {
  clearMemory(): void {
    this.memorize(Memory.Count, 0)
    this.memorize(Memory.IsBuildInProgress, false)
  }
}
