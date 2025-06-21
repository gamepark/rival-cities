import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { ActionType } from '../ActionType'
import { CustomMoveType } from '../CustomMoveType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { BasicActionHelper } from '../helper/BasicActionHelper'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class DonationActionRule extends PlayerTurnRule {
  actionType = ActionType.Donation
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  productType?: Product
  nbProduct = 2
  nbStars = 1
  nbTimes = 1
  nbProductsDonated: number = this.remind(MemoryType.NbProductsDonated) ?? 0
  isDonationInProgress = this.remind(MemoryType.IsDonationInProgress)

  getPlayerMoves(): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (this.playerProducts.getQuantity() < this.nbProduct) return [this.customMove(CustomMoveType.Pass, this.actionType)]
    if (this.isDonationInProgress) {
      moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id })))
    } else {
      if (this.nbProductsDonated < this.nbProduct && this.starTokens.length > 0) {
        const playerHaveAllianceAmsterdam = new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceAmsterdam)
        moves.push(
          ...this.starTokens.moveItems(
            { type: LocationType.PlayerStarTokens, player: this.player },
            playerHaveAllianceAmsterdam ? this.nbStars + 1 : this.nbStars
          )
        )
      }
      moves.push(this.customMove(CustomMoveType.Pass, this.actionType))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      this.memorize(MemoryType.BasicActionChoosen, this.actionType)
      if(this.productType) {
        moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), this.nbProduct))
      } else {
        this.memorize(MemoryType.IsDonationInProgress, true)
      }
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isDonationInProgress) {
      this.memorize(MemoryType.NbProductsDonated, this.nbProductsDonated + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if(this.productType) {
        this.memorize<number>(MemoryType.NbDonations, (old) => old + 1)
        if (this.remind(MemoryType.NbDonations) === this.nbTimes) {
          return this.computedActionHelper.removeActionAndnext(this.actionType)
        }
      } else if (this.remind(MemoryType.NbProductsDonated) === this.nbProduct) {
        this.memorize(MemoryType.IsDonationInProgress, false)
        this.memorize<number>(MemoryType.NbDonations, (old) => old + 1)
        if (this.remind(MemoryType.NbDonations) === this.nbTimes) {
          return this.computedActionHelper.removeActionAndnext(this.actionType)
        }
      }
    }
    return moves
  }

  get playerProducts() {
    if (!this.productType) {
      return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
    }
    return this.material(MaterialType.Product).id(this.productType).location(LocationType.PlayerProducts).player(this.player)
  }

  get starTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }
}
