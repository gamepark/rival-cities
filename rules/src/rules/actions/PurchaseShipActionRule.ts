import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { BasicActionHelper } from '../helper/BasicActionHelper'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { CustomMoveType } from '../CustomMoveType'

export class PurchaseShipActionRule extends PlayerTurnRule {
  actionType = ActionType.PurchaseShip
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  shipChoosen = this.remind(MemoryType.ShipChoosen)

  getPlayerMoves(): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (!this.shipChoosen) {
      return [
        ...this.possibleCardsToGet().moveItems({ type: LocationType.PlayerShipCards, player: this.player }),
        ...this.playerLetters.moveItems({ type: LocationType.LetterDeck }),
        this.customMove(CustomMoveType.Pass, this.actionType)]
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move) && move.location.type === LocationType.PlayerShipCards) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.PurchaseShip)
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
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if(isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize<RuleId[]>(MemoryType.BonusesRules, (old) => [RuleId.SwapProduct, ...old])
      return this.computedActionHelper.removeActionAndnext()
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
    if (!this.shipChoosen) {
      this.memorize(MemoryType.ShipChoosen, shipId)
    }
    const shipData = shipCardsData[shipId]
    const costQuantity = this.playerShip19.length ? shipData.cost.quantity - 1 : shipData.cost.quantity
    moves.push(...this.playerProducts.id(shipData.cost.type).moveItems({ type: LocationType.ProductPiles, id: shipData.cost.type }, costQuantity))
    if (shipData.effect.type === ShipEffectType.Instant) {
      this.memorize<RuleId[]>(MemoryType.BonusesRules, shipData.effect.rules!)
    }
    moves.push(...this.computedActionHelper.removeActionAndnext(this.actionType))
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
