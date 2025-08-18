import { isMoveItemType, ItemMove, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { SwapProduct } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'
import { ActionRule } from './ActionRule'

export class SwapProductRule extends ActionRule<SwapProduct> {
  playerSwapping: City

  constructor(game: MaterialGame, action?: SwapProduct, player?: City) {
    super(game, action)
    this.playerSwapping = player ?? this.player
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    if (this.action.swap) {
      moves.push(...this.productsSupply.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.playerSwapping, id: item.id }), 1))
    } else {
      if (this.productsSupply.getQuantity() > 0) {
        moves.push(...this.getProducts(this.playerSwapping).moveItems((item) => ({ type: LocationType.ProductSupply, id: item.id }), 1))
      }
      if (!this.action.isLetterSwap) {
        moves.push(this.customMove(CustomMoveType.Pass))
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (move.location.type === LocationType.ProductSupply) {
        this.action.swap = true
      } else if (move.location.type === LocationType.PlayerProducts) {
        this.action.swap = false
        this.action.times--
        if (!this.action.times) {
          if (this.remind(Memory.PlayerProductSwap, this.playerSwapping)) {
            this.forget(Memory.PlayerProductSwap, this.playerSwapping)
          } else {
            return [this.startNextRule()]
          }
        }
      }
    }
    return []
  }

  get productsSupply() {
    return this.material(MaterialType.Product).location(LocationType.ProductSupply)
  }
}
