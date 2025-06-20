import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { GainLetterActionRule } from '../actions/GainLetterActionRule'
import { MemoryType } from '../MemoryType'
import { ActionType } from '../ActionType'

export class GainLetterRule extends GainLetterActionRule {

  onRuleStart(): MaterialMove[] {
    return [this.letters.moveItem({ type: LocationType.PlayerLetterDeck, player: this.player })]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Letter)(move)) {
        this.memorize(MemoryType.NextRules, this.remind(MemoryType.NextRules).slice(1))
      if(this.remind(MemoryType.NextRules).length > 0) {
        this.forget(MemoryType.BasicActionChoosen)
        return [this.startRule(this.remind(MemoryType.NextRules)[0])]
      }
      return new ComputedActionsHelper(this.game).removeActionAndnext(ActionType.PurchaseShip)
    }
    return []
  }

  get letters() {
    return this.material(MaterialType.Letter).location(LocationType.LetterDeck)
  }
}
