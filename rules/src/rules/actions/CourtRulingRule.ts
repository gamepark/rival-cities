import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { ActionType, CourtRuling } from '../../material/Action'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class CourtRulingRule extends ActionRule<CourtRuling> {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []

    const firstLawsuit = this.material(MaterialType.LawsuitPiece).location((l) => l.x === 0)
    const firstLawsuitX = this.material(MaterialType.LawsuitMarker).parent(firstLawsuit.getIndex()).getItem()!.location.x!
    if ((this.player === City.Altona && firstLawsuitX <= -2) || (this.player === City.Hamburg && firstLawsuitX >= 2)) {
      moves.push(this.customMove(CustomMoveType.ResolveLawsuit))
    }

    const lawsuitPieces = this.material(MaterialType.LawsuitPiece)
    for (const index of lawsuitPieces.getIndexes()) {
      const lawsuitPiece = lawsuitPieces.index(index)
      const lawsuitX = lawsuitPiece.getItem()!.location.x!
      if (lawsuitX > 0) {
        moves.push(lawsuitPiece.moveItem({ type: LocationType.LawsuitPieceSpot, x: lawsuitX - 1 }))
      }
    }

    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitPiece)(move)) {
      moves.push(this.startNextRule())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.ResolveLawsuit)(move)) {
      this.addActions({ type: ActionType.ResolveLawsuit })
      return [this.startNextRule()]
    }
    return super.onCustomMove(move)
  }

  get lawsuitMarkerToResolve() {
    const firstLawsuit = this.material(MaterialType.LawsuitPiece)
      .location((l) => l.x === 0)
      .getIndex()
    return this.material(MaterialType.LawsuitMarker).location((loc) => loc.type === LocationType.LawsuitMarkerSpace && loc.parent === firstLawsuit)
  }
}
