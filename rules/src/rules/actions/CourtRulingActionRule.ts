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
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    const xPositionToCanResolve = this.player === City.Altona ? [-2, -3, -4] : [2, 3, 4]

    if (xPositionToCanResolve.includes(this.lawsuitMarkerToResolve.getItem()?.location.x!)) {
      moves.push(this.customMove(CustomMoveType.ResolveLawsuit))
    }

    if (this.lawsuitCardToMove.length) {
      moves.push(this.lawsuitCardToMove.moveItem(({ location }) => ({ ...location, z: 0 })))
      moves.push(this.lawsuitCardToMove.moveItem(({ location }) => ({ ...location, z: 2 })))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitCard)(move) && move.location.z !== 1) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
      moves.push(
        this.material(MaterialType.LawsuitCard)
          .location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === move.location.z)
          .moveItem(({ location }) => ({ ...location, z: 1 }))
      )
      moves.push(
        this.material(MaterialType.LawsuitMarker)
          .location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === move.location.z)
          .moveItem(({ location }) => ({ ...location, id: 1 }))
      )
      moves.push(
        this.material(MaterialType.LawsuitMarker)
          .location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === 1)
          .moveItem(({ location }) => ({ ...location, id: move.location.z }))
      )
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitCard)(move) && move.location.z === 1) {
      moves.push(...this.removeActionAndMove())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isCustomMoveType(CustomMoveType.ResolveLawsuit)(move)) {
      return this.addActionBonusAndMove({ type: ActionType.ResolveLawsuit })
    }
    return []
  }

  get lawsuitMarkerToResolve() {
    return this.material(MaterialType.LawsuitMarker).location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === 0)
  }

  get lawsuitCardToMove() {
    return this.material(MaterialType.LawsuitCard).location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 1)
  }
}
