import { getEnumValues, isMoveItemType, ItemMove, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { City } from '../../City'
import { Action, ActionType, AdvanceLawsuit } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { Cost, CostType } from '../../material/Cost'
import { Lawsuit, lawsuitData } from '../../material/Lawsuit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class AdvanceLawsuitRule extends ActionRule<AdvanceLawsuit> {
  getPlayerMoves() {
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.Pass)]
    const deltaX = this.player === City.Altona ? -1 : 1
    const markers = this.markers.location((l) => l.x !== deltaX * 4 && this.canPayLawsuit(l.parent!))
    moves.push(...markers.moveItems((marker) => ({ ...marker, x: marker.location.x! + deltaX })))
    return moves
  }

  get markers() {
    const markers = this.material(MaterialType.LawsuitMarker)
    return this.action.lawsuitIndex ? markers.parent(this.action.lawsuitIndex) : markers
  }

  canPayLawsuit(lawsuitIndex: number) {
    const card = this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).parent(lawsuitIndex).getItem<Lawsuit>()
    return !!card && this.canPay(lawsuitData[card.id].cost)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      return this.onMoveMarker(move)
    }
    return []
  }

  onMoveMarker(move: MoveItem) {
    const extraActions: Action[] = []
    const card = this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).parent(move.location.parent).getItem<Lawsuit>()!
    const { cost, advanceBonus } = lawsuitData[card.id]
    const count = this.action.count ?? 0
    if (count === 0) {
      for (const action of advanceBonus) {
        extraActions.push(action)
      }
    }
    const lawsuitX = this.material(MaterialType.LawsuitPiece).getItem(move.location.parent!).location.x!
    if (Math.abs(move.location.x!) !== 4 && count < lawsuitX) {
      extraActions.push({ type: ActionType.AdvanceLawsuit, lawsuitIndex: move.location.parent, count: count + 1 })
    }
    if (this.hasAlliance(Alliance.LeHavre) && !this.action.isLeHavreBonus && count === 0) {
      extraActions.push({
        type: ActionType.PayToPerformActionAgain,
        price: 1,
        actionToPerformAgain: { type: ActionType.AdvanceLawsuit, isLeHavreBonus: true }
      })
    }
    this.addActions(...extraActions)
    return [...this.pay(cost), this.endAction()]
  }

  pay(cost: Cost) {
    const moves: MaterialMove[] = []
    switch (cost.type) {
      case CostType.Product:
        moves.push(this.playerProducts.id(cost.product).moveItem({ type: LocationType.ProductPiles, id: cost.product }, cost.amount))
        break
      case CostType.Products:
        for (const product of getEnumValues(Product)) {
          const amount = cost.amount[product]
          if (amount) {
            moves.push(this.playerProducts.id(product).moveItem({ type: LocationType.ProductPiles, id: product }, amount))
          }
        }
        break
      case CostType.Letters:
        moves.push(this.playerLetters.moveItem({ type: LocationType.LetterDeck }, 1))
        break
    }
    return moves
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }
}
