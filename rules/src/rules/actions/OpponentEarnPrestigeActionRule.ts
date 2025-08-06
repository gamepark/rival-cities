import { MaterialMove } from '@gamepark/rules-api'
import { OpponentEarnPrestigeAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { Alliance } from '../../material/Alliance'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard } from '../../material/ShipCard'
import { ActionRule } from './ActionRule'

export class OpponentEarnPrestigeActionRule extends ActionRule<OpponentEarnPrestigeAction> {
  onRuleStart(): MaterialMove[] {
    this.addActionBonus({
      type: ActionType.EarnPrestige,
      playerWhoEarnedPrestige: this.nextPlayer,
      playerCanUseAllianceBruxelles: this.nextPlayerHaveAllianceBruxelles,
      playerCanUseShip16: this.nextPlayerHaveShip16
    })
    return [this.endAction()]
  }

  get nextPlayerHaveAllianceBruxelles() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.nextPlayer).id(Alliance.Bruxelles).length > 0
  }

  get nextPlayerHaveShip16() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.nextPlayer).id(ShipCard.Ship16).length > 0
  }
}
