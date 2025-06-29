import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { FormAllianceAction } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class FormAllianceActionRule extends ActionRule<FormAllianceAction> {
  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    moves.push(...this.allianceCards.moveItems({ type: LocationType.PlayerAllianceCards, player: this.player }))
    if (this.playerLetters.length) {
      moves.push(...this.opponentAllianceCards.moveItems({ type: LocationType.PlayerAllianceCards, player: this.player }))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action?.type))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
      const oldLocationType = this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.location.type
      if (oldLocationType === LocationType.PlayerAllianceCards) {
        return [this.playerLetters.moveItem(() => ({ type: LocationType.LetterDeck }))]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.removeActionAndMove())
    }
    return []
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get allianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.AllianceCardsLayout)
  }

  get opponentAllianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.nextPlayer)
  }
}
