import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'

export class PurchaseShipActionRule extends PlayerTurnRule {
  actionType = ActionType.PurchaseShip
  computedActionHelper = new ComputedActionsHelper(this.game)
  shipChoosen = this.remind(MemoryType.ShipChoosen)

  onRuleStart(): MaterialMove[] {
    if(this.possibleCardsToGet().length === 0) {
      return this.computedActionHelper.removeActionAndWait(this.actionType)
    }
    return []
  }

  getPlayerMoves(onNotShipChoosenMoves: MaterialMove[] = []): MaterialMove[] {
    if (!this.shipChoosen) {
      return [...this.possibleCardsToGet().moveItems({ type: LocationType.PlayerShipCards, player: this.player }), ...onNotShipChoosenMoves]
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.PurchaseShip)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ShipCard)(move)) {
      const shipId: ShipCard = this.material(MaterialType.ShipCard).index(move.itemIndex).getItem()?.id
      if (!this.shipChoosen) {
        this.memorize(MemoryType.ShipChoosen, shipId)
      }
      const shipData = shipCardsData[shipId]
      moves.push(...this.playerProducts.id(shipData.cost.type).moveItems({ type: LocationType.ProductPiles, id: shipData.cost.type }, shipData.cost.quantity))
      if (shipData.effect.type === ShipEffectType.Instant) {
        this.forget(MemoryType.ShipChoosen)
        this.memorize(MemoryType.NextRules, shipData.effect.rules)
      }
      moves.push(...this.computedActionHelper.removeActionAndWait(this.actionType))
    }
    return moves
  }

  possibleCardsToGet() {
    return this.shipCards.filter((item) => {
      const shipData = shipCardsData[item.id as ShipCard]
      return this.playerProducts.id(shipData.cost.type).getQuantity() >= shipData.cost.quantity
    })
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get shipCards() {
    return this.material(MaterialType.ShipCard).location(LocationType.ShipCardsRiver)
  }
}
