import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { AbstractBasicActionCardRule } from './AbstractBasicActionCardRule'

export class BasicActionCard4Rule extends AbstractBasicActionCardRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.playerProducts.length) {
      moves.push(...this.playerProducts.moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id })))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move)) {
      this.memorize<number>(MemoryType.NbProductGiven, (oldValue) => oldValue + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) && this.remind(MemoryType.NbProductGiven) === 2) {
      return [this.factories.moveItem({ type: LocationType.PlayerFactories, player: this.player })]
    }
    if (isMoveItemType(MaterialType.Factory)(move)) {
      return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.opponent)]
    }
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get factories() {
    return this.material(MaterialType.Factory)
      .location(LocationType.FactoryDeck)
  }
}
