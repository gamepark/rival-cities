import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Donation } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { CostType } from '../../material/Cost'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'
import { ActionRule } from './ActionRule'

export class DonationRule extends ActionRule<Donation> {
  getPlayerMoves() {
    const playerProducts = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
    const productsToPay = this.remind<number | undefined>(Memory.Count)
    if (productsToPay) {
      return playerProducts.moveItems((item) => ({ type: LocationType.ProductSupply, id: item.id }))
    }
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.Pass)]
    const starTokensStock = this.material(MaterialType.StarToken).location(LocationType.StarTokenSupply)
    const products = this.action.cost.type === CostType.Product ? playerProducts.id(this.action.cost.product) : playerProducts
    if (products.getQuantity() >= this.action.cost.amount && starTokensStock.getQuantity() > 0) {
      const stars = this.hasAlliance(Alliance.Amsterdam) ? this.action.stars + 1 : this.action.stars
      moves.push(starTokensStock.moveItem({ type: LocationType.PlayerStarTokens, player: this.player }, stars))
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    const cost = this.action.cost
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      this.memorize(Memory.Count, cost.amount)
      if (cost.type === CostType.Product) {
        const products = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(cost.product)
        return [products.moveItem({ type: LocationType.ProductSupply, id: cost.product }, cost.amount)]
      }
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductSupply) {
      const count = this.memorize<number>(Memory.Count, (count) => count - (move.quantity ?? 1))
      if (count === 0) {
        this.action.times--
        if (this.action.times === 0) {
          return [this.startNextRule()]
        }
      }
    }
    return []
  }

  onRuleEnd() {
    super.onRuleEnd()
    this.forget(Memory.Count)
    return []
  }
}
