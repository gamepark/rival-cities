import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ShipCard } from '../../material/ShipCard'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { AllianceCard } from '../../material/AllianceCard'
import { BasicActionHelper } from '../helper/BasicActionHelper'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class EarnPrestigeActionRule extends PlayerTurnRule {
  actionType = ActionType.EarnPrestige
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  playerWhoEarnedPrestige = this.player

  onRuleStart(): MaterialMove[] {
    const move = this.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return this.prestigeMarker.moveItems(({ location }) => ({ ...location, x: location.x! + move }))
  }

  getPlayerMoves(): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const move = this.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return this.prestigeMarker.moveItems(({ location }) => ({ ...location, x: location.x! + move }))
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.EarnPrestige)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      this.forget(MemoryType.BasicActionChoosen)
      const playerShip16 = this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.playerWhoEarnedPrestige).id(ShipCard.Ship16)
      if(playerShip16.length > 0 && this.playerBeers.length >= 2) {
        return [this.startPlayerTurn(RuleId.EarnPrestigeAgain, this.playerWhoEarnedPrestige)]
      }
      const playerHaveAllianceBruxelles = new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceBruxelles)
      if(playerHaveAllianceBruxelles && this.playerFurnitures.getQuantity() > 0) {
        return [this.startPlayerTurn(RuleId.AllianceCardEarnPrestigeAgain, this.playerWhoEarnedPrestige)]
      }
      return this.computedActionHelper.removeActionAndWait(this.actionType)
    }
    return []
  }

  get prestigeMarker() {
    return this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste)
  }

  get playerBeers() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.playerWhoEarnedPrestige).id(Product.Beer)
  }

  get playerFurnitures() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.playerWhoEarnedPrestige).id(Product.Furniture)
  }
}
