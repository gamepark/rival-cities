import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'

export class EarnPrestigeActionRule extends PlayerTurnRule {
  actionType = ActionType.EarnPrestige
  computedActionHelper = new ComputedActionsHelper(this.game)
  playerWhoEarnedPrestige = this.player

  onRuleStart(): MaterialMove[] {
    const move = this.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return this.prestigeMarker.moveItems(({ location }) => ({ ...location, x: location.x! + move }))
  }

  getPlayerMoves(): MaterialMove[] {
    const move = this.playerWhoEarnedPrestige === City.Altona ? -1 : 1
    return this.prestigeMarker.moveItems(({ location }) => ({ ...location, x: location.x! + move }))
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.EarnPrestige)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.PrestigeMarker)(move)) {
      moves.push(...this.computedActionHelper.removeActionAndWait(this.actionType))
    }
    return moves
  }

  get prestigeMarker() {
    return this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste)
  }
}
