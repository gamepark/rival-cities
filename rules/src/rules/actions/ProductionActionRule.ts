import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { BasicActionHelper } from '../helper/BasicActionHelper'

export class ProductionActionRule extends PlayerTurnRule {
  actionType = ActionType.Production
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  productChoosen = this.remind(MemoryType.ProductChoosen)
  productType?: Product

  onRuleStart(): MaterialMove[] {
    return [...this.products.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id }))]
  }

  getPlayerMoves(onNotProductChoosenMoves: MaterialMove[] = []): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (!this.productChoosen) {
      const productsToMove = this.productType ? this.products : this.allProducts
      return [...productsToMove.moveItems((item) => ({ type: LocationType.PlayerProducts, player: this.player, id: item.id })), ...onNotProductChoosenMoves]
    }
    if (this.playerFactories.length) {
      return [...this.playerFactories.rotateItems(true), this.customMove(CustomMoveType.Pass)]
    }
    return [this.customMove(CustomMoveType.Pass)]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.Product)(move) && (!this.productType || this.productType === move.location.id)) {
      if (!this.remind(MemoryType.BasicActionChoosen)) {
        this.memorize(MemoryType.BasicActionChoosen, this.actionType)
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && (!this.productType || this.productType === move.location.id)) {
      if (!this.productChoosen) {
        this.memorize(MemoryType.ProductChoosen, move.location.id)
        if (this.productType === Product.Beer && move.location.id === Product.Beer) {
          moves.push(...this.products.moveItems({ ...move.location, type: LocationType.PlayerProducts }, 1))
        }
        if(this.playerShipCards.length > 0) {
          for (const shipCard of this.playerShipCards) {
            const shipCardData = shipCardsData[shipCard.id as ShipCard]
            if (shipCardData.effect.action) {
              moves.push(...shipCardData.effect.action(this.game, this.player))
            }
          }
        }
        moves.push(...this.checkAllianceCards(move.location.id as Product, Product.Furniture, AllianceCard.AllianceOslo))
        moves.push(...this.checkAllianceCards(move.location.id as Product, Product.Leather, AllianceCard.AllianceNovgorod))
        moves.push(...this.checkAllianceCards(move.location.id as Product, Product.Cloth, AllianceCard.AllianceLondon))
      } else if (this.playerFactories.length === 0) {
        this.forget(MemoryType.ProductChoosen)
        this.forget(MemoryType.BasicActionChoosen)
        moves.push(...this.computedActionHelper.removeActionAndWait(this.actionType))
      }
    }
    if (isMoveItemType(MaterialType.Factory)(move)) {
      if (!this.productType) {
        this.forget(MemoryType.ProductChoosen)
      }
      if (this.productChoosen === this.productType) {
        moves.push(...this.products.moveItems({ type: LocationType.PlayerProducts, id: this.productChoosen, player: this.player }, 1))
      }
    }
    return moves
  }

  checkAllianceCards(product: Product, allianceProduct: Product, allianceCard: AllianceCard): MaterialMove[] {
    const alliance = this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(allianceCard)
    if(alliance.length && product === allianceProduct) {
      return this.allProducts.id(product).moveItems({ type: LocationType.PlayerProducts, id: allianceProduct }, 1)
    }
    return []
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
      .filter((it) => shipCardsData[it.id as ShipCard].effect.type === ShipEffectType.OnProduction).getItems()
  }
}
