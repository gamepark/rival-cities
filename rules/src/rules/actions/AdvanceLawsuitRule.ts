import { CustomMove, isMoveItemType, ItemMove, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { City } from '../../City'
import { Action, ActionType, AdvanceLawsuit } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { CostType } from '../../material/Cost'
import { Lawsuit, lawsuitData } from '../../material/Lawsuit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { CostHelper } from '../helper/CostHelper'
import { ActionRule } from './ActionRule'

export class AdvanceLawsuitRule extends ActionRule<AdvanceLawsuit> {
  getPlayerMoves() {
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.Pass)]
    const lawsuitIndexes = this.action.lawsuitIndex ? [this.action.lawsuitIndex] : this.material(MaterialType.LawsuitPiece).getIndexes()
    for (const lawsuitIndex of lawsuitIndexes) {
      if (this.canPayLawsuit(lawsuitIndex)) {
        moves.push(this.customMove(CustomMoveType.AdvanceLawsuit, lawsuitIndex))
      }
    }
    return moves
  }

  canPayLawsuit(lawsuitIndex: number) {
    const card = this.lawsuitCards.parent(lawsuitIndex).getItem<Lawsuit>()
    return !!card && new CostHelper(this.game).canPay(this.player, lawsuitData[card.id].cost)
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.AdvanceLawsuit) {
      const lawsuitIndex = move.data as number
      const card = this.lawsuitCards.parent(lawsuitIndex).getItem<Lawsuit>()!
      const { cost } = lawsuitData[card.id]
      const moves: MaterialMove[] = new CostHelper(this.game).pay(this.player, cost)
      const marker = this.material(MaterialType.LawsuitMarker).parent(lawsuitIndex)
      const deltaX = this.player === City.Altona ? -1 : 1
      moves.push(marker.moveItem((marker) => ({ ...marker.location, x: marker.location.x! + deltaX })))
      return moves
    }
    return super.onCustomMove(move)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      return this.onMoveMarker(move)
    }
    return []
  }

  onMoveMarker(move: MoveItem) {
    const lawsuitIndex = move.location.parent!
    const extraActions: Action[] = []
    const card = this.lawsuitCards.parent(lawsuitIndex).getItem<Lawsuit>()!
    const { advanceBonus } = lawsuitData[card.id]
    const count = this.action.count ?? 0
    if (count === 0) {
      for (const action of advanceBonus) {
        extraActions.push(structuredClone(action))
      }
    }
    const lawsuitX = this.material(MaterialType.LawsuitPiece).getItem(lawsuitIndex).location.x!
    if (Math.abs(move.location.x!) !== 4 && count < lawsuitX) {
      extraActions.push({ type: ActionType.AdvanceLawsuit, lawsuitIndex: move.location.parent, count: count + 1 })
    }
    if (this.hasAlliance(Alliance.LeHavre) && !this.action.isLeHavreBonus && count === 0) {
      extraActions.push({
        type: ActionType.RepeatAction,
        cost: { type: CostType.AnyProducts, amount: 1 },
        extraAction: { type: ActionType.AdvanceLawsuit, isLeHavreBonus: true },
        source: Alliance.LeHavre
      })
    }
    this.addActions(...extraActions)
    return [this.startNextRule()]
  }

  get lawsuitCards() {
    return this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace)
  }

  canAffordAfterSpending(product: Product) {
    return this.lawsuitCards.getItems<Lawsuit>().some((item) => {
      const cost = lawsuitData[item.id].cost
      const costHelper = new CostHelper(this.game)
      switch (cost.type) {
        case CostType.Product:
          return cost.product === product ? costHelper.canPay(this.player, { ...cost, amount: cost.amount + 1 }) : costHelper.canPay(this.player, cost)
        case CostType.Products:
          return costHelper.canPay(this.player, { ...cost, amount: { ...cost.amount, [product]: (cost.amount[product] ?? 0) + 1 } })
        default:
          return costHelper.canPay(this.player, cost)
      }
    })
  }
}
