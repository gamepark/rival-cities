import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Donation } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
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
      return playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }))
    }
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.Pass)]
    const starTokensStock = this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
    const products = this.action.product ? playerProducts.id(this.action.product) : playerProducts
    if (products.getQuantity() >= this.action.cost && starTokensStock.getQuantity() > 0) {
      const stars = this.hasAlliance(Alliance.Amsterdam) ? this.action.stars + 1 : this.action.stars
      moves.push(starTokensStock.moveItem({ type: LocationType.PlayerStarTokens, player: this.player }, stars))
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      if (this.action.product) {
        const products = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(this.action.product)
        return [products.moveItem({ type: LocationType.ProductPiles, id: this.action.product }, this.action.cost), this.startNextRule()]
      } else {
        this.memorize(Memory.Count, this.action.cost)
      }
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && !this.action.product) {
      const count = this.memorize<number>(Memory.Count, (count) => count - 1)
      if (count === 0) {
        return [this.startNextRule()]
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
