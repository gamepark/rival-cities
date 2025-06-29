import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PurchaseShipAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { CustomMoveType } from '../CustomMoveType'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class PurchaseShipActionRule extends ActionRule<PurchaseShipAction> {
  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    return [
      ...this.possibleCardsToGet().moveItems({ type: LocationType.PlayerShipCards, player: this.player }),
      ...this.playerLetters.moveItems({ type: LocationType.LetterDeck }),
      this.customMove(CustomMoveType.Pass, this.action?.type)
    ]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
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
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.Letter)(move) && !this.remind(MemoryType.BasicActionChoosen)) {
      return this.addActionBonusAndMove({ type: ActionType.ProductSwap, nbPossibleSwaps: 1 })
    }
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
    const costQuantity = this.playerShip19.length ? shipData.cost.quantity - 1 : shipData.cost.quantity
    moves.push(...this.playerProducts.id(shipData.cost.type).moveItems({ type: LocationType.ProductPiles, id: shipData.cost.type }, costQuantity))
    this.removeAction()
    if (shipData.effect.type === ShipEffectType.Instant) {
      if (shipData.effect.action) {
        shipData.effect.action(this.game, this.player).forEach((it) => this.addActionBonus(it))
      }
    }
    moves.push(...this.moveToNextAction())
    return moves
  }

  possibleCardsToGet() {
    return this.shipCards.filter((item) => {
      const shipData = shipCardsData[item.id as ShipCard]
      const costQuantity = this.playerShip19.length ? shipData.cost.quantity - 1 : shipData.cost.quantity
      return this.playerProducts.id(shipData.cost.type).getQuantity() >= costQuantity
    })
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get shipCards() {
    return this.material(MaterialType.ShipCard).location(LocationType.ShipCardsRiver)
  }

  get playerShip19() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship19)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }
}
