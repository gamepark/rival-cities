import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'

export class DrawSpecialActionCardActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  onRuleStart(): MaterialMove[] {
    if (this.specialActionCard.length) {
      return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.DrawSpecialActionCard)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      return [...this.nextRuleHelper.moveToNextRule()]
    }
    return []
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.SpecialActionCardsDeck)
      .maxBy((it) => it.location.x!)
  }
}
