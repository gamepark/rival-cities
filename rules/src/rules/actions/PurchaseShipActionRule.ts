import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Action, EarnPrestigeAction, PurchaseShipAction } from '../../material/Actions/Actions'
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
    const moves: MaterialMove[] = []
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    moves.push(...this.possibleCardsToGet().moveItems({ type: LocationType.PlayerShipCards, player: this.player }))
    if (this.playerProducts.length && this.playerLetters.length) {
      moves.push(this.customMove(CustomMoveType.TakeLetterToSwapProduct))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      this.memorize(MemoryType.BasicActionChosen, this.action.type)
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
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.movesOnPushasedShip(move))
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.TakeLetterToSwapProduct)(move)) {
      return [this.playerLetters.moveItem({ type: LocationType.LetterDeck }), ...this.startAction({ type: ActionType.ProductSwap, nbPossibleSwaps: 1 })]
    }
    return super.onCustomMove(move)
  }

  movesOnPushasedShip(move: MaterialMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.ShipCard)(move)) return []
    const moves: MaterialMove[] = []
    const shipId: ShipCard = this.material(MaterialType.ShipCard).index(move.itemIndex).getItem()?.id
    this.updateAction(shipId)
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

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  updateAction(ship: ShipCard): void {
    const action = this.remind<Action[]>(MemoryType.Actions)[0]
    if (ship === ShipCard.Ship16) {
      if (action.type === ActionType.Multiple) {
        const prestigeAction: EarnPrestigeAction | undefined = action.actions.find((a) => a.type === ActionType.EarnPrestige) as EarnPrestigeAction
        if (prestigeAction) {
          prestigeAction.playerCanUseShip16 = true
        }
      }
    }
  }
}
