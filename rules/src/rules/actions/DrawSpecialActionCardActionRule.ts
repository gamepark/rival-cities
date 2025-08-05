import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { DrawSpecialActionCardAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class DrawSpecialActionCardActionRule extends ActionRule<DrawSpecialActionCardAction> {
  onRuleStart(): MaterialMove[] {
    return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      this.memorize(MemoryType.BasicActionChosen, this.action?.type)
      this.memorize<number>(MemoryType.Counter, (old) => old + 1)
      if (this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDeck).length < 1) {
        const moves: MaterialMove[] = []
        moves.push(this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDiscard).shuffle())
        moves.push(
          this.material(MaterialType.SpecialActionCard)
            .location(LocationType.SpecialActionCardsDiscard)
            .moveItemsAtOnce({ type: LocationType.SpecialActionCardsDeck })
        )
        return moves
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if (this.remind(MemoryType.Counter) === this.action?.nbCardsToDraw) {
        this.removeAction()
        this.memorize(MemoryType.Counter, 0)
        if (this.action?.playerCanUseAllianceKjjobenhavn && this.playerBeers.getQuantity() > 0) {
          this.addActionBonus({
            type: ActionType.PayToPerformActionAgain,
            productType: Product.Beer,
            price: 1,
            actionToPerformAgain: {
              type: ActionType.DrawSpecialActionCard,
              nbCardsToDraw: 1,
              playerCanUseAllianceKjjobenhavn: false
            }
          })
        }
        return this.moveToNextAction()
      }
    }
    return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.SpecialActionCardsDeck)
      .maxBy((it) => it.location.x!)
  }

  get playerBeers() {
    return this.material(MaterialType.Product).id(Product.Beer).location(LocationType.PlayerProducts).player(this.player)
  }
}
