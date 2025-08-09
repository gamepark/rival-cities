import { getEnumValues, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Production } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ShipCard, shipCardsData, ShipEffectType } from '../../material/ShipCard'
import { CustomMoveType } from '../CustomMoveType'
import { GainProductsRule } from './GainProductsRule'

export class ProductionRule extends GainProductsRule<Production> {
  onRuleStart(): MaterialMove[] {
    const playerMoves = this.getPlayerMoves()
    if (playerMoves.length === 1) {
      return playerMoves
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.action.product) {
      moves.push(this.gainProduct(this.action.product)[0])
    } else {
      for (const product of getEnumValues(Product)) {
        const gain = this.gainProduct(product)[0]
        if (!isCustomMoveType(CustomMoveType.ProductForgo)(gain)) {
          moves.push(gain)
        }
      }
    }
    if (!moves.length || !this.action.quantity) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.PlayerProducts) {
      if (!this.action.productsGained) {
        for (const ship of this.playerShips) {
          const shipCardData = shipCardsData[ship]
          if (shipCardData.effect.type === ShipEffectType.OnProduction) {
            // TODO: better ship effect typing to remove ! cast
            moves.push(...this.gainProduct(shipCardData.effect.product!))
          }
        }
      }
      if (this.action.quantity > 0) {
        this.action.quantity -= move.quantity ?? 1
      } else {
        moves.push(this.availableFactories.rotateItem(true))
      }
    }
    moves.push(...super.afterItemMove(move))
    for (const move of moves) {
      if (isMoveItemType(MaterialType.Product)(move)) {
        // We need to identify free products offered by alliances and ships so that it does not flip factories
        this.action.quantity += move.quantity ?? 1
      }
    }
    if (!this.action.quantity && !this.availableFactories.length) {
      moves.push(this.endAction())
    }
    return moves
  }

  get availableFactories() {
    return this.material(MaterialType.Factory).location(LocationType.PlayerFactories).player(this.player).rotation(undefined)
  }

  get playerShips() {
    return this.material(MaterialType.ShipCard)
      .location(LocationType.PlayerShipCards)
      .player(this.player)
      .getItems<ShipCard>()
      .map((item) => item.id)
  }
}
