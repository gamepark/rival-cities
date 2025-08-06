import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { EarnPrestigeAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class EarnPrestigeActionRule extends ActionRule<EarnPrestigeAction> {
  onRuleStart(): MaterialMove[] {
    const move = this.action.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return [this.prestigeMarker.moveItem(({ location }) => ({ ...location, x: location.x! + move }))]
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    const move = this.action.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return [this.prestigeMarker.moveItem(({ location }) => ({ ...location, x: location.x! + move }))]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      this.memorize(MemoryType.BasicActionChosen, this.action.type)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.movesOnPrestigeMarkerMoved())
    }
    return []
  }

  movesOnPrestigeMarkerMoved(): MaterialMove[] {
    if (this.action.playerCanUseShip16 && this.playerBeers.length >= 2) {
      this.addActionBonus({
        type: ActionType.PayToPerformActionAgain,
        productType: Product.Beer,
        price: 2,
        actionToPerformAgain: {
          type: ActionType.EarnPrestige,
          playerWhoEarnedPrestige: this.action.playerWhoEarnedPrestige,
          playerCanUseAllianceBruxelles: false,
          playerCanUseShip16: false
        }
      })
    }
    if (this.action.playerCanUseAllianceBruxelles && this.playerFurnitures.getQuantity() > 0) {
      this.addActionBonus({
        type: ActionType.PayToPerformActionAgain,
        productType: Product.Furniture,
        price: 1,
        actionToPerformAgain: {
          type: ActionType.EarnPrestige,
          playerWhoEarnedPrestige: this.action.playerWhoEarnedPrestige,
          playerCanUseAllianceBruxelles: false,
          playerCanUseShip16: false
        }
      })
    }
    return [this.endAction()]
  }

  get prestigeMarker() {
    return this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste)
  }

  get playerBeers() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.action.playerWhoEarnedPrestige).id(Product.Beer)
  }

  get playerFurnitures() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.action.playerWhoEarnedPrestige).id(Product.Furniture)
  }
}
