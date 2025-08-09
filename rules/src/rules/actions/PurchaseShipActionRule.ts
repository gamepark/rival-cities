import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PurchaseShipAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { CustomMoveType } from '../CustomMoveType'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { ActionRule } from './ActionRule'

export class PurchaseShipActionRule extends ActionRule<PurchaseShipAction> {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.possibleCardsToGet().moveItems({ type: LocationType.PlayerShipCards, player: this.player }))
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      moves.push(
        this.material(MaterialType.ShipCard)
          .location(LocationType.ShipCardsDeck)
          .maxBy((it) => it.location.x!)
          .moveItem({ type: LocationType.ShipCardsRiver })
      )
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.movesOnPushasedShip(move))
    }
    return moves
  }

  movesOnPushasedShip(move: MaterialMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.ShipCard)(move)) return []
    const moves: MaterialMove[] = []
    const shipId: ShipCard = this.material(MaterialType.ShipCard).index(move.itemIndex).getItem()?.id
    const shipData = shipCardsData[shipId]
    const costQuantity = this.action.playerHasShip19 ? shipData.cost.quantity - 1 : shipData.cost.quantity
    moves.push(...this.playerProducts.id(shipData.cost.type).moveItems({ type: LocationType.ProductPiles, id: shipData.cost.type }, costQuantity))
    if (shipData.effect.type === ShipEffectType.Instant) {
      if (shipData.effect.action) {
        shipData.effect.action(this.game, this.player).forEach((it) => this.addActionBonus(it))
      }
    }
    moves.push(this.endAction())
    return moves
  }

  possibleCardsToGet() {
    return this.shipCards.filter((item) => {
      const shipData = shipCardsData[item.id as ShipCard]
      const costQuantity = this.action.playerHasShip19 ? shipData.cost.quantity - 1 : shipData.cost.quantity
      return this.playerProducts.id(shipData.cost.type).getQuantity() >= costQuantity
    })
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get shipCards() {
    return this.material(MaterialType.ShipCard).location(LocationType.ShipCardsRiver)
  }
}
