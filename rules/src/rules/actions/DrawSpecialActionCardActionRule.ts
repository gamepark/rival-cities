import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { DrawSpecialActionCardAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { Alliance } from '../../material/Alliance'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionRule } from './ActionRule'

export class DrawSpecialActionCardActionRule extends ActionRule<DrawSpecialActionCardAction> {
  onRuleStart(): MaterialMove[] {
    return [
      this.material(MaterialType.SpecialActionCard)
        .location(LocationType.SpecialActionCardsDeck)
        .deck()
        .dealOne({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if (this.hasKjjobenhavnAlliance && !this.action.isKjjobenhavnBonus && this.hasBeer) {
        this.addActionBonus({
          type: ActionType.PayToPerformActionAgain,
          productType: Product.Beer,
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
