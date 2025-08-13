import { MaterialMove } from '@gamepark/rules-api'
import { GainStars } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionRule } from './ActionRule'

export class GainStarsRule extends ActionRule<GainStars> {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const supply = this.material(MaterialType.StarToken).location(LocationType.StarTokenSupply)
    if (supply.getQuantity() > 0) {
      moves.push(supply.moveItem({ type: LocationType.PlayerStarTokens, player: this.player }, this.action.stars))
    }
    moves.push(this.startNextRule())
    return moves
  }
}
