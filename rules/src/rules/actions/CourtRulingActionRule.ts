import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { CourtRullingAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class CourtRulingActionRule extends ActionRule<CourtRullingAction> {
  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
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
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitPiece)(move)) {
      this.memorize(MemoryType.BasicActionChosen, this.action.type)
      moves.push(...this.removeActionAndMove())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action.type)) return []
    if (isCustomMoveType(CustomMoveType.ResolveLawsuit)(move)) {
      return this.addActionBonusAndMove({ type: ActionType.ResolveLawsuit })
    }
    return []
  }

  get lawsuitMarkerToResolve() {
    const firstLawsuit = this.material(MaterialType.LawsuitPiece)
      .location((l) => l.x === 0)
      .getIndex()
    return this.material(MaterialType.LawsuitMarker).location((loc) => loc.type === LocationType.LawsuitMarkerSpace && loc.parent === firstLawsuit)
  }
}
