import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Donation } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class DonationRule extends ActionRule<Donation> {
  onRuleStart(): MaterialMove[] {
    // TODO: do not use donation for lawsuit star gains
    const moves: MaterialMove[] = []
    if (this.action.nbProduct === 0) {
      const playerHaveAllianceAmsterdam = new AllianceCardHelper(this.game).checkPlayerAllianceCardById(Alliance.Amsterdam)
      moves.push(
        ...this.starTokens.moveItems(
          { type: LocationType.PlayerStarTokens, player: this.player },
          playerHaveAllianceAmsterdam ? this.nbStars + 1 : this.nbStars
        )
      )
    }
    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    const playerProducts = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
    const productsToPay = this.remind<number | undefined>(MemoryType.Count)
    if (productsToPay) {
      return playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }))
    }
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.Pass, this.action)]
    const starTokensStock = this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
    const products = this.action.productType ? playerProducts.id(this.action.productType) : playerProducts
    if (products.getQuantity() >= this.action.nbProduct && starTokensStock.getQuantity() > 0) {
      const stars = this.hasAmsterdamAlliance ? this.action.nbStars + 1 : this.action.nbStars
      moves.push(starTokensStock.moveItem({ type: LocationType.PlayerStarTokens, player: this.player }, stars))
    }
    return moves
  }

  get hasAmsterdamAlliance() {
    return this.material(MaterialType.AllianceCard).id(Alliance.Amsterdam).getItem()?.location.player === this.player
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      if (this.action.productType) {
        const products = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(this.action.productType)
        return [products.moveItem({ type: LocationType.ProductPiles, id: this.action.productType }, this.action.nbProduct), this.endAction()]
      } else {
        this.memorize(MemoryType.Count, this.action.nbProduct)
      }
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && !this.action.productType) {
      const count = this.memorize<number>(MemoryType.Count, (count) => count - 1)
      if (count === 0) {
        return [this.endAction()]
      }
    }
    return []
  }

  get starTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }

  get nbStars() {
    return this.action.nbStars ?? 0
  }
}
