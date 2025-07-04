import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'
import { InkJarPisteHelper } from './helper/InkjarPisteHelper'

export class AdvanceInkJarRule extends PlayerTurnRule {
  inkjarPisteHelper = new InkJarPisteHelper(this.game, this.player)
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.inkjarPisteHelper.possibleInkjarLocation().forEach((location) => {
      moves.push(this.inkjar.moveItem(location))
    })
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.InkJar)(move)) return []
    const startId = this.material(MaterialType.InkJar).index(move.itemIndex).getItem()?.location.id ?? 0
    const endId = move.location.id as number
    const nbCaseAdvanced = endId > startId ? endId - startId : endId + 20 - startId
    this.memorize(MemoryType.NbProductToPayForAdvance, this.inkjarPisteHelper.determineNbProductToPay(nbCaseAdvanced))
    if (endId < startId) {
      this.memorize(MemoryType.OffSeasonStep, RuleId.OffSeasonTakeBell)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.InkJar)(move)) return []
    if (this.remind(MemoryType.NbProductToPayForAdvance) > 0) {
      return [this.startRule(RuleId.PayProductForAdvance)]
    }
    return [this.startRule(this.remind<RuleId | undefined>(MemoryType.OffSeasonStep) ?? RuleId.ChooseAction)]
  }

  get inkjar() {
    return this.material(MaterialType.InkJar).location(LocationType.InkJarPiste)
  }
}
