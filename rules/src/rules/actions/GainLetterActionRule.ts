import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { BasicActionHelper } from '../helper/BasicActionHelper'
import { CustomMoveType } from '../CustomMoveType'

export class GainLetterActionRule extends PlayerTurnRule {
  actionType = ActionType.GainLetter
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  nbLettersToTake = 1

  //onRuleStart(): MaterialMove[] {
  //  return this.letters.moveItem({ type: LocationType.PlayerLetterDeck, player: this.player }, this.nbLettersToTake)
  //}

  getPlayerMoves(): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    return [
      ...this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player }, this.nbLettersToTake),
      this.customMove(CustomMoveType.Pass, this.actionType)
    ]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, this.actionType)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      moves.push(...this.computedActionHelper.removeActionAndnext(this.actionType))
    }
    return moves
  }

  get letters() {
    return this.material(MaterialType.Letter).location(LocationType.LetterDeck)
  }
}
