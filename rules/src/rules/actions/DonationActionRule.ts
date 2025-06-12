import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'

export class DonationActionRule extends PlayerTurnRule {
  nbProductsDonated = this.remind(MemoryType.NbProductsDonated) ?? 0
  isDonationInProgress = this.remind(MemoryType.IsDonationInProgress)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(this.isDonationInProgress) {
      moves.push(...this.playerProducts.moveItems(item => ({ type: LocationType.ProductPiles, id: item.id })))
    } else {
      if(this.nbProductsDonated < 2 && this.starTokens.length > 0) {
        moves.push(...this.starTokens.moveItems({ type: LocationType.PlayerStarTokens, player: this.player }))
      }
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.Donation)
      this.memorize(MemoryType.IsDonationInProgress, true)
    } else if(isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isDonationInProgress) {
      this.memorize(MemoryType.NbProductsDonated, this.nbProductsDonated + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if(this.remind(MemoryType.NbProductsDonated) === 2) {
        this.memorize(MemoryType.IsDonationInProgress, false)
      }
    }
    return moves
  }

  onRuleEnd(): MaterialMove[] {
    this.memorize(MemoryType.NbProductsDonated, 0)
    this.memorize(MemoryType.IsDonationInProgress, false)
    return []
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get starTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }
}
