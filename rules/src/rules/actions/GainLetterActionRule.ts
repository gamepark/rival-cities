import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'

export class GainLetterActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  onRuleStart(): MaterialMove[] {
    return this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player })
  }
  getPlayerMoves(): MaterialMove[] {
    return this.letters.moveItems({ type: LocationType.PlayerLetterDeck, player: this.player })
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.GainLetter)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Letter)(move)) {
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    return moves
  }

  get letters() {
    return this.material(MaterialType.Letter).location(LocationType.LetterDeck)
  }
}
