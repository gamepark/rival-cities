import { MaterialRulesPart } from '@gamepark/rules-api'
import { MemoryType } from '../MemoryType'

export class MemoryHelper extends MaterialRulesPart {
  clearMemory(): void {
    this.memorize(MemoryType.NbProductToPayForAdvance, 0)
    this.memorize(MemoryType.PlayerNbProducts, 0)
    this.memorize(MemoryType.NbProductGiven, 0)
    this.memorize(MemoryType.NbTimeAdvancedInLawsuit, 0)
    this.memorize(MemoryType.IsProductReturn, false)
    this.memorize(MemoryType.IsBuildInProgress, false)
    this.memorize(MemoryType.NbProductsDonated, 0)
    this.memorize(MemoryType.NbProductStealed, 0)
    this.memorize(MemoryType.NbDonations, 0)
    this.memorize(MemoryType.NbCardsDraw, 0)
    this.memorize(MemoryType.IsDonationInProgress, false)
    this.forget(MemoryType.ProductChoosen)
    this.forget(MemoryType.ShipChoosen)
    this.forget(MemoryType.BasicActionChoosen)
  }
}
