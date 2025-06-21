import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { GainLetterActionRule } from '../actions/GainLetterActionRule'

export class GainLetterRule extends GainLetterActionRule {
  onRuleStart(): MaterialMove[] {
    return [this.letters.moveItem({ type: LocationType.PlayerLetterDeck, player: this.player })]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Letter)(move)) {
      return new ComputedActionsHelper(this.game).removeActionAndnext()
    }
    return []
  }
}
