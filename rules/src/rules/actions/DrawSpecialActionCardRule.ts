import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { ActionType, DrawSpecialActionCard } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { cost } from '../../material/Cost'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionRule } from './ActionRule'

export class DrawSpecialActionCardRule extends ActionRule<DrawSpecialActionCard> {
  onRuleStart() {
    return this.getPlayerMoves()
  }

  getPlayerMoves() {
    const deck = this.material(MaterialType.SpecialActionCard).location(LocationType.ActionStack).deck()
    if (deck.length) {
      return [deck.dealOne({ type: LocationType.PlayerHand, player: this.player })]
    } else {
      return [this.startNextRule()]
    }
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if (this.hasAlliance(Alliance.Kjobenhavn) && !this.action.isKjjobenhavnBonus && this.hasBeer) {
        this.addActions({
          type: ActionType.RepeatAction,
          cost: cost(1, Product.Beer),
          source: Alliance.Kjobenhavn,
          extraAction: {
            type: ActionType.DrawSpecialActionCard,
            isKjjobenhavnBonus: true
          }
        })
      }
      return [this.startNextRule()]
    }
    return []
  }

  get hasBeer() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(Product.Beer).getQuantity() > 0
  }
}
