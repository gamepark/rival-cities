import { MaterialRulesPart } from '@gamepark/rules-api'
import { MemoryType } from '../MemoryType'
import { ActionType } from '../ActionType'

export class BasicActionHelper extends MaterialRulesPart {
  checkAnotherActionInProgress(actionType?: ActionType) {
    return this.remind(MemoryType.BasicActionChoosen) && this.remind(MemoryType.BasicActionChoosen) !== actionType
  }
}
