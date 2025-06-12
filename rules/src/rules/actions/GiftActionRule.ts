import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'

export class GiftActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  nbProductToTake?: number
  productType?: Product
  productChoosen = this.remind(MemoryType.ProductChoosen)
  nbProductGiven = this.remind<number>(MemoryType.NbProductGiven)

  constructor(game: MaterialGame, nbProductToTake?: number, productType?: Product) {
    super(game)
    this.nbProductToTake = nbProductToTake
    this.productType = productType
  }

  onRuleStart(): MaterialMove[] {
    if(this.productType) {
      return [...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), this.nbProductToTake)]
    }
    return []
  }

  getPlayerMoves(onNotProductChoosenMoves: MaterialMove[] = []): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(!this.productChoosen) {
      moves.push(...onNotProductChoosenMoves)
    }
    moves.push(...this.allProducts.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })))
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      if (!this.productChoosen) {
        this.memorize(MemoryType.ProductChoosen, move.location.id)
      }
      this.memorize(MemoryType.BasicActionChoosen, ActionType.Gift)
      this.memorize(MemoryType.NbProductGiven, this.nbProductGiven + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.id === this.productChoosen) {
      if (this.nbProductGiven === this.nbProductToTake) {
        return [...this.nextRuleHelper.moveToNextRule()]
      }
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.ProductChoosen)
    this.memorize(MemoryType.NbProductGiven, 0)
    return []
  }

  get products() {
    const resourcesInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles).id(this.productType)

    if (resourcesInReserve.length > 0) return resourcesInReserve

    const opponentResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer).id(this.productType)
    const playerResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(this.productType)

    if (opponentResource.length > playerResource.length) return opponentResource

    return resourcesInReserve
  }

  get allProducts() {
    const resourcesInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles)

    if (resourcesInReserve.length > 0) return resourcesInReserve

    const opponentResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer)
    const playerResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)

    if (opponentResource.length > playerResource.length) return opponentResource

    return resourcesInReserve
  }
}
