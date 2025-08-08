import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class PayInkJarMovementCostRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.Product)(move)) return []
    const countLeft = this.memorize<number>(MemoryType.Count, (count) => count - 1)
    if (!countLeft) {
      return [this.startRule(this.remind<RuleId | undefined>(MemoryType.PendingRule) ?? RuleId.ChooseAction)]
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }
}
