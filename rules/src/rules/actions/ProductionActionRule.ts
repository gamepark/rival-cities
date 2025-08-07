import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Action, ProductionAction } from '../../material/Actions/Actions'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class ProductionActionRule extends ActionRule<ProductionAction> {
  allianceCardHelper = new AllianceCardHelper(this.game)
  productChoosen = this.remind(MemoryType.ProductChosen)

  onRuleStart(): MaterialMove[] {
    this.forget(MemoryType.ProductChosen)
    return this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), this.action.quantity)
  }

  getPlayerMoves(): MaterialMove[] {
    if (!this.productChoosen) {
      const productsToMove = this.action.productType ? this.products : this.allProducts
      return [
        ...productsToMove.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), this.action.quantity),
        this.customMove(CustomMoveType.Pass, this.action)
      ]
    }
    if (this.playerFactories.length && (!this.action.productType || this.action.productType === this.productChoosen)) {
      return [...this.playerFactories.rotateItems(true), this.customMove(CustomMoveType.Pass, this.action)]
    }
    return [this.customMove(CustomMoveType.Pass, this.action)]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Factory)(move)) {
      if (!this.action.productType) {
        this.forget(MemoryType.ProductChosen)
      }
      if (this.productChoosen === this.action.productType) {
        return [this.products.moveItem({ type: LocationType.PlayerProducts, id: this.productChoosen, player: this.player })]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && (!this.action.productType || this.action.productType === move.location.id)) {
      if (!this.productChoosen) {
        this.memorize(MemoryType.ProductChosen, move.location.id)
        if (this.action.canGetMore) {
          if (this.playerShipCards.length > 0) {
            for (const shipCard of this.playerShipCards) {
              const shipCardData = shipCardsData[shipCard.id as ShipCard]
              if (shipCardData.effect.move) {
                moves.push(...shipCardData.effect.move(this.game, this.player))
              }
            }
          }
          moves.push(...this.allianceCardHelper.getOsloProducts(move.location.id as Product))
          moves.push(...this.allianceCardHelper.getNovgorodProducts(move.location.id as Product))
          moves.push(...this.allianceCardHelper.getLondonProducts(move.location.id as Product))
          this.action.canGetMore = false
        }
      } else if (this.playerFactories.length === 0) {
        this.forget(MemoryType.ProductChosen)
        moves.push(this.endAction())
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move) && this.isSameAction(move.data as Action)) {
      this.forget(MemoryType.ProductChosen)
      return [this.endAction()]
    }
    return super.onCustomMove(move)
  }

  get playerFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(undefined)
  }

  get products() {
    const resourcesInReserve = this.material(MaterialType.Product).location(LocationType.ProductPiles).id(this.action.productType)

    if (resourcesInReserve.length > 0) return resourcesInReserve

    const opponentResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.nextPlayer).id(this.action.productType)
    const playerResource = this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).id(this.action.productType)

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

  get playerShipCards() {
    return this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .player(this.player)
      .filter((it) => shipCardsData[it.id as ShipCard].effect.type === ShipEffectType.OnProduction)
      .getItems()
  }
}
