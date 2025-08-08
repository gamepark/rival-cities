import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { GiftAction } from '../../material/Actions/Actions'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class GiftActionRule extends ActionRule<GiftAction> {
  allianceCardHelper = new AllianceCardHelper(this.game)

  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.action.productType) {
      for (let i = 0; i < this.action.nbProductToTake; i++) {
        moves.push(this.products.moveItem({ type: LocationType.PlayerProducts, player: this.player, id: this.action.productType }))
      }
    }
    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.action.productType) {
      moves.push(
        ...this.products.moveItems({ type: LocationType.PlayerProducts, player: this.player, id: this.action.productType }, this.action.nbProductToTake)
      )
    } else {
      moves.push(...this.allProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), 1))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      this.memorize<number>(MemoryType.Count, (old) => old + (move.quantity ?? 1))
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      if (this.action.canUseAlliance) {
        moves.push(...this.allianceCardHelper.getOsloProducts(move.location.id as Product))
        moves.push(...this.allianceCardHelper.getNovgorodProducts(move.location.id as Product))
        moves.push(...this.allianceCardHelper.getLondonProducts(move.location.id as Product))
      }
      if (this.remind(MemoryType.Count) === this.action.nbProductToTake) {
        moves.push(...this.movesAfterProductsGiven())
      }
    }
    return moves
  }

  movesAfterProductsGiven(): MaterialMove[] {
    this.memorize(MemoryType.Count, 0)
    return [this.endAction()]
  }

  get products() {
    const productsInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles).id(this.action.productType)

    if (productsInReserve.length > 0) return productsInReserve

    const opponentProduct = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer).id(this.action.productType)
    const playerProduct = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(this.action.productType)

    if (opponentProduct.length > playerProduct.length) return opponentProduct

    return productsInReserve
  }

  get allProducts() {
    const productsInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles)

    if (productsInReserve.length > 0) return productsInReserve

    const opponentProduct = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer)
    const playerProduct = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)

    if (opponentProduct.length > playerProduct.length) return opponentProduct

    return productsInReserve
  }
}
