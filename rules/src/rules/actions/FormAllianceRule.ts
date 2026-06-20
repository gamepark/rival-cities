import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { FormAlliance } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class FormAllianceRule extends ActionRule<FormAlliance> {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(...this.freeAlliances.moveItems({ type: LocationType.PlayerAlliances, player: this.player }))
    if (this.playerLetters.length) {
      moves.push(...this.opponentAlliances.moveItems({ type: LocationType.PlayerAlliances, player: this.player }))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      const origin = this.material(MaterialType.AllianceCard).getItem(move.itemIndex).location
      if (origin.type === LocationType.PlayerAlliances) {
        moves.push(this.playerLetters.moveItem({ type: LocationType.LetterSupply }, 1))
      }
      moves.push(this.startNextRule())
    }
    return moves
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetters).player(this.player)
  }

  get freeAlliances() {
    return this.material(MaterialType.AllianceCard).location(LocationType.AllianceSpace)
  }

  get opponentAlliances() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.nextPlayer)
  }
}
