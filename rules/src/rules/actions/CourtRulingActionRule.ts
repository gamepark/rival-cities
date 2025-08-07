import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { CourtRullingAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class CourtRulingActionRule extends ActionRule<CourtRullingAction> {
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

    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitPiece)(move)) {
      moves.push(this.endAction())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.ResolveLawsuit)(move)) {
      return this.startAction({ type: ActionType.ResolveLawsuit })
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
