import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { AbstractBasicActionCardRule } from './AbstractBasicActionCardRule'

export class BasicActionCard2Rule extends AbstractBasicActionCardRule {
  onRuleStart(): MaterialMove[] {
    if (this.specialActionCard.length) {
      return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.opponent)]
    }
    return []
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.SpecialActionCardsDeck)
      .maxBy((it) => it.location.x!)
  }
}
