import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class CourtRulingActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const xPositionToCanResolve = this.player === City.Altona ? [-2, -3, -4] : [2, 3, 4]

    if (xPositionToCanResolve.includes(this.lawsuitMarkerToResolve.getItem()?.location.x!)) {
      moves.push(this.customMove(CustomMoveType.ResolveLawsuit))
    }

    moves.push(this.lawsuitCardToMove.moveItem(({ location }) => ({ ...location, z: 0 })))
    moves.push(this.lawsuitCardToMove.moveItem(({ location }) => ({ ...location, z: 2 })))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitCard)(move) && move.location.z !== 1) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.CourtRuling)
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
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitCard)(move) && move.location.z === 1) {
      moves.push(...this.nextRuleHelper.moveToNextRule())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.ResolveLawsuit)(move)) {
      return [this.startRule(RuleId.ResolveLawsuit)]
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
