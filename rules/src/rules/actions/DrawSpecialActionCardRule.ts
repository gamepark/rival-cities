import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { ActionType, DrawSpecialActionCard } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionRule } from './ActionRule'

export class DrawSpecialActionCardRule extends ActionRule<DrawSpecialActionCard> {
  onRuleStart() {
    return this.getPlayerMoves()
  }

  getPlayerMoves() {
    const deck = this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDeck).deck()
    if (deck.length) {
      return [deck.dealOne({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
    } else {
      return this.removeActionAndMove()
    }
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if (this.hasKjjobenhavnAlliance && !this.action.isKjjobenhavnBonus && this.hasBeer) {
        this.addActionBonus({
          type: ActionType.PayToPerformActionAgain,
          product: Product.Beer,
          price: 1,
          actionToPerformAgain: {
            type: ActionType.DrawSpecialActionCard,
            isKjjobenhavnBonus: true
          }
        })
      }
      return this.removeActionAndMove()
    }
    return []
  }

  get hasKjjobenhavnAlliance() {
    return this.material(MaterialType.AllianceCard).id(Alliance.Kjjobenhavn).getItem()?.location.player === this.player
  }

  get hasBeer() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(Product.Beer).getQuantity() > 0
  }
}
