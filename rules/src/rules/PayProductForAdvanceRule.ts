import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class PayProductForAdvanceRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.PlayerNbProducts, this.playerProducts.getQuantity())
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return [...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }))]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.Product)(move)) return []
    const playerBaseBnProducts = this.remind(MemoryType.PlayerNbProducts)
    const nbProductToPay = this.remind(MemoryType.NbProductToPayForAdvance)
    if (this.playerProducts.getQuantity() === playerBaseBnProducts - nbProductToPay) {
      return [this.startRule(RuleId.ChooseAction)]
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }
}
