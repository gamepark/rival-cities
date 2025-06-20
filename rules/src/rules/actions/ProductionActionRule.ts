import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { BasicActionHelper } from '../helper/BasicActionHelper'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class ProductionActionRule extends PlayerTurnRule {
  actionType = ActionType.Production
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  allianceCardHelper = new AllianceCardHelper(this.game)
  productChoosen = this.remind(MemoryType.ProductChoosen)
  productType?: Product
  quantity = 1

  //onRuleStart(): MaterialMove[] {
  //  return this.products.limit(this.quantity).moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), this.quantity)
  //}

  getPlayerMoves(): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (!this.productChoosen) {
      const productsToMove = this.productType ? this.products : this.allProducts
      return [
        ...productsToMove.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }), this.quantity),
        this.customMove(CustomMoveType.Pass, this.actionType)
      ]
    }
    if (this.playerFactories.length) {
      return [...this.playerFactories.rotateItems(true), this.customMove(CustomMoveType.Pass, this.actionType)]
    }
    return [this.customMove(CustomMoveType.Pass, this.actionType)]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.Product)(move) && (!this.productType || this.productType === move.location.id)) {
      if (!this.remind(MemoryType.BasicActionChoosen)) {
        this.memorize(MemoryType.BasicActionChoosen, this.actionType)
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move)) {
      if (!this.productType) {
        this.forget(MemoryType.ProductChoosen)
      }
      if (this.productChoosen === this.productType) {
        return [this.products.moveItem({ type: LocationType.PlayerProducts, id: this.productChoosen, player: this.player })]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && (!this.productType || this.productType === move.location.id)) {
      if (!this.productChoosen) {
        this.memorize(MemoryType.ProductChoosen, move.location.id)
        if (this.playerShipCards.length > 0) {
          for (const shipCard of this.playerShipCards) {
            const shipCardData = shipCardsData[shipCard.id as ShipCard]
            if (shipCardData.effect.action) {
              moves.push(...shipCardData.effect.action(this.game, this.player))
            }
          }
        }
        moves.push(...this.allianceCardHelper.getOsloProducts(move.location.id as Product))
        moves.push(...this.allianceCardHelper.getNovgorodProducts(move.location.id as Product))
        moves.push(...this.allianceCardHelper.getLondonProducts(move.location.id as Product))
      } else if (this.playerFactories.length === 0) {
        moves.push(...this.computedActionHelper.removeActionAndnext(this.actionType))
      }
    }
    return moves
  }

  get playerFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(undefined)
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

  get playerShipCards() {
    return this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .player(this.player)
      .filter((it) => shipCardsData[it.id as ShipCard].effect.type === ShipEffectType.OnProduction)
      .getItems()
  }
}
