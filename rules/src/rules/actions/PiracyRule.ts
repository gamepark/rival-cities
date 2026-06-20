import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { Piracy } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionRule } from './ActionRule'

export class PiracyRule extends ActionRule<Piracy> {
  onRuleStart() {
    if (!this.rivalProducts.getQuantity()) {
      return [this.startNextRule()]
    }
    return []
  }

  getPlayerMoves() {
    return this.rivalProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Product)(move)) {
      this.action.nbProductsToSteal--
      if (!this.action.nbProductsToSteal || !this.rivalProducts.getQuantity()) {
        return [this.startNextRule()]
      }
    }
    return []
  }

  get rivalProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(getRival(this.player))
  }
}
