import { MaterialMove } from '@gamepark/rules-api'
import { OpponentEarnPrestigeAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionRule } from './ActionRule'

export class OpponentEarnPrestigeActionRule extends ActionRule<OpponentEarnPrestigeAction> {
  onRuleStart(): MaterialMove[] {
    this.removeAction()
    return this.addActionBonusAndMove({
      type: ActionType.EarnPrestige,
      playerWhoEarnedPrestige: this.nextPlayer,
      playerCanUseAllianceBruxelles: this.nextPlayerHaveAllianceBruxelles,
      playerCanUseShip16: this.nextPlayerHaveShip16
    })
  }

  get nextPlayerHaveAllianceBruxelles() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.nextPlayer).length > 0
  }

  get nextPlayerHaveShip16() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.nextPlayer).length > 0
  }
}
