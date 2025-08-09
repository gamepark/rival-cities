import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { PiracyAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionRule } from './ActionRule'

export class PiracyActionRule extends ActionRule<PiracyAction> {
  onRuleStart() {
    if (!this.rivalProducts.getQuantity()) {
      return this.removeActionAndMove()
    }
    return []
  }

  getPlayerMoves() {
    return this.rivalProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Product)(move)) {
      this.action.nbProductsToSteal--
      if (!this.action.nbProductsToSteal || !this.rivalProducts.getQuantity()) {
        return this.removeActionAndMove()
      }
    }
    return []
  }

  get rivalProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(getRival(this.player))
  }
}
