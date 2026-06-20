import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { BuildFactory } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class BuildFactoryRule extends ActionRule<BuildFactory> {
  onRuleStart() {
    if (!this.factoriesSupply.length) {
      return [this.startNextRule()]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const products = this.getProducts()
    if (this.action.building) {
      return products.moveItems((item) => ({ type: LocationType.ProductSupply, id: item.id }), 1)
    }
    const factoriesSupply = this.factoriesSupply
    if (factoriesSupply.length && products.getQuantity() >= (this.action.cost ?? 0)) {
      moves.push(factoriesSupply.moveItem({ type: LocationType.PlayerFactories, player: this.player, rotation: false }, 1))
    }
    if (!this.action.building) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Factory)(move)) {
      if (this.action.cost) {
        this.action.building = true
      } else {
        return [this.startNextRule()]
      }
    } else if (isMoveItemType(MaterialType.Product)(move)) {
      this.action.cost!--
      if (!this.action.cost) {
        return [this.startNextRule()]
      }
    }
    return []
  }

  get factoriesSupply() {
    return this.material(MaterialType.Factory).location(LocationType.FactorySupply)
  }
}
