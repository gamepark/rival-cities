import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { City, getRival } from '../../City'
import { ActionType, EarnPrestige, PayToPerformActionAgainAction } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { cost } from '../../material/Cost'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { Ship } from '../../material/Ship'
import { ActionRule } from './ActionRule'

export class EarnPrestigeRule extends ActionRule<EarnPrestige> {
  onRuleStart() {
    return this.getPlayerMoves()
  }

  getPlayerMoves() {
    const delta = this.playerEarningPrestige === City.Altona ? -1 : 1
    return [this.material(MaterialType.PrestigeMarker).moveItem((item) => ({ type: LocationType.PrestigeMarkerPiste, x: item.location.x! + delta }))]
  }

  get playerEarningPrestige() {
    return this.action.rival ? getRival(this.player) : this.player
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      const performAgainActions: PayToPerformActionAgainAction[] = []
      if (!this.action.isBruxellesBonus && this.hasAlliance(Alliance.Bruxelles, this.playerEarningPrestige) && this.hasFurniture) {
        performAgainActions.push({
          type: ActionType.PayToPerformActionAgain,
          cost: cost(1, Product.Furniture),
          isRivalTurn: this.action.rival ?? this.action.isRivalTurn,
          extraAction: {
            type: ActionType.EarnPrestige,
            isBruxellesBonus: true,
            isRivalTurn: this.action.rival ?? this.action.isRivalTurn
          }
        })
      }
      if (!this.action.isShip16Bonus && this.hasShip16 && this.beers >= 2) {
        performAgainActions.push({
          type: ActionType.PayToPerformActionAgain,
          cost: cost(2, Product.Beer),
          isRivalTurn: this.action.rival ?? this.action.isRivalTurn,
          extraAction: {
            type: ActionType.EarnPrestige,
            isShip16Bonus: true,
            isRivalTurn: this.action.rival ?? this.action.isRivalTurn
          }
        })
      }
      if (performAgainActions.length) {
        this.addActions(...performAgainActions)
      }
      return [this.startNextRule()]
    }
    return []
  }

  get hasFurniture() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.playerEarningPrestige).id(Product.Furniture).getQuantity() > 0
  }

  get hasShip16() {
    return this.material(MaterialType.ShipCard).id(Ship.Ship16).getItem()?.location.player === this.playerEarningPrestige
  }

  get beers() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.playerEarningPrestige).id(Product.Beer).getQuantity()
  }
}
