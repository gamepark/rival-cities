import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { INK_SPACES, InkJarPisteHelper } from './helper/InkjarPisteHelper'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class AdvanceInkJarRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const inkJar = this.material(MaterialType.InkJar)
    return new InkJarPisteHelper(this.game).possibleInkJarLocation().map((location) => inkJar.moveItem(location))
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.InkJar)(move)) return []
    const initialSpace = this.material(MaterialType.InkJar).getItem(move.itemIndex).location.id as number
    const endSpace = move.location.id as number
    const distance = (endSpace + INK_SPACES - initialSpace) % INK_SPACES
    const movementCost = new InkJarPisteHelper(this.game).getMovementCost(distance)
    if (endSpace < initialSpace) {
      this.memorize(MemoryType.OffSeasonStep, RuleId.OffSeasonTakeBell)
    }
    if (movementCost > 0) {
      this.memorize(MemoryType.Count, movementCost)
      return [this.startRule(RuleId.PayInkJarMovementCost)]
    } else {
      return [this.startRule(this.remind<RuleId | undefined>(MemoryType.OffSeasonStep) ?? RuleId.ChooseAction)]
    }
  }
}
