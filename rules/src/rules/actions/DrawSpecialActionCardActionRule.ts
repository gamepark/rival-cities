import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'

export class DrawSpecialActionCardActionRule extends PlayerTurnRule {
  actionType = ActionType.DrawSpecialActionCard
  computedActionHelper = new ComputedActionsHelper(this.game)
  nbCardsToDraw = 1

  onRuleStart(): MaterialMove[] {
    return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.DrawSpecialActionCard)
      this.memorize<number>(MemoryType.NbCardsDraw, (old) => old + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if(this.remind(MemoryType.NbCardsDraw) === this.nbCardsToDraw) {
        this.memorize(MemoryType.NbCardsDraw, 0)
        return this.computedActionHelper.removeActionAndWait(this.actionType)
      }
    }
    return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.SpecialActionCardsDeck)
      .maxBy((it) => it.location.x!)
  }
}
