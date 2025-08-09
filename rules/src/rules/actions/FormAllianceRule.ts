import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { FormAlliance } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { ActionRule } from './ActionRule'

export class FormAllianceRule extends ActionRule<FormAlliance> {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.allianceCards.moveItems({ type: LocationType.PlayerAlliances, player: this.player }))
    if (this.playerLetters.length) {
      moves.push(...this.opponentAllianceCards.moveItems({ type: LocationType.PlayerAlliances, player: this.player }))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      const oldLocationType = this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.location.type
      if (oldLocationType === LocationType.PlayerAlliances) {
        return [this.playerLetters.moveItem(() => ({ type: LocationType.LetterDeck }))]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      return new EndOfGameHelper(this.game).checkInstantEndOfGame([this.endAction()])
    }
    return []
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get allianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.AllianceSpace)
  }

  get opponentAllianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.nextPlayer)
  }
}
