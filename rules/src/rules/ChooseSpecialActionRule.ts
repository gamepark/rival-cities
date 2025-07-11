import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Action, ChooseSpecialActionCardAction } from '../material/Actions/Actions'
import { SpecialActionCardHelper } from '../material/helper/SpecialActionCardHelper'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpecialActionCard } from '../material/SpecialActionCard'
import { ActionRule } from './actions/ActionRule'
import { CustomMoveType } from './CustomMoveType'
import { ActionRuleIds } from './helper/ActionRuleIds'
import { MemoryType } from './MemoryType'

export class ChooseSpecialActionRule extends ActionRule<ChooseSpecialActionCardAction> {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.playerSpecialActionCards.moveItems({ type: LocationType.SpecialActionCardsDiscard }))
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) {
      const actions: Action[] = []
      const cardId = this.material(MaterialType.SpecialActionCard).index(move.itemIndex).getItem()?.id as SpecialActionCard
      actions.push(new SpecialActionCardHelper(this.game).specialActionCardActions[cardId])
      this.memorize(MemoryType.Actions, actions)
      return [this.startRule(ActionRuleIds[actions[0].type])]
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return this.removeActionAndMove()
    }
    return []
  }

  get playerSpecialActionCards() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.PlayerSpecialActionCardsHand).player(this.player)
  }
}
