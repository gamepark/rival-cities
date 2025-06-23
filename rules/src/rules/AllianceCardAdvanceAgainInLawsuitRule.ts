import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { AdvanceLawsuitActionRule } from './actions/AdvanceLawsuitActionRule'
import { MemoryType } from './MemoryType'

export class AllianceCardAdvanceAgainInLawsuitRule extends AdvanceLawsuitActionRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.NbTimeUsedAllianceLeHavre, 0)
    if (this.possibleCardsToGet().length === 0) {
      return this.computedActionHelper.removeActionAndnext(this.actionType)
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.remind(MemoryType.NbProductGiven) === 1) {
      return super.getPlayerMoves()
    }

    const moves: MaterialMove[] = []
    moves.push(...this.playerProducts.moveItems((it) => ({ type: LocationType.ProductPiles, id: it.location.id })))
    moves.push(this.customMove(CustomMoveType.Pass, this.actionType))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return super.beforeItemMove(move)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.remind(MemoryType.NbProductGiven) === 0) {
        this.memorize(MemoryType.NbProductGiven, 1)
      }
    }
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      return super.afterItemMove(move)
    }
    return []
  }
}
