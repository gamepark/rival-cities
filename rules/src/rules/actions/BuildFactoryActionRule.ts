import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'

export class BuildFactoryActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  price: number
  isBuildInProgress = this.remind(MemoryType.IsBuildInProgress)
  nbProductsGiven = this.remind(MemoryType.NbProductGiven) ?? 0

  constructor(game: MaterialGame, price = 0) {
    super(game)
    this.price = price
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(this.isBuildInProgress) {
      moves.push(...this.playerProducts.moveItems(item => ({ type: LocationType.ProductPiles, id: item.id })))
    } else {
      if(this.factories.length > 0) {
        moves.push(...this.factories.moveItems({ type: LocationType.PlayerFactories, player: this.player }, 1))
      }
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Factory)(move) && move.location.type === LocationType.PlayerFactories) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.BuildFactory)
      this.memorize(MemoryType.IsBuildInProgress, true)
    } else if(isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isBuildInProgress) {
      this.memorize(MemoryType.NbProductGiven, this.nbProductsGiven + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if(this.remind(MemoryType.NbProductGiven) === this.price) {
        return [...this.nextRuleHelper.moveToNextRule()]
      }
    }
    return moves
  }

  onRuleEnd(): MaterialMove[] {
    this.memorize(MemoryType.NbProductGiven, 0)
    this.memorize(MemoryType.IsBuildInProgress, false)
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get factories() {
    return this.material(MaterialType.Factory).location(LocationType.FactoryDeck)
  }
}
