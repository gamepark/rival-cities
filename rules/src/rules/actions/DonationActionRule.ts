import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { DonationAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { AllianceCard } from '../../material/AllianceCard'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class DonationActionRule extends ActionRule<DonationAction> {
  nbProductsDonated: number = this.remind(MemoryType.Counter) ?? 0
  isDonationInProgress = this.remind(MemoryType.IsDonationInProgress)

  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (this.playerProducts.getQuantity() < this.nbProduct) return [this.customMove(CustomMoveType.Pass, this.action?.type)]
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
      moves.push(this.customMove(CustomMoveType.Pass, this.action?.type))
      moves.push(this.customMove(CustomMoveType.TakeLetterToSwapProduct))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
      if (this.action?.productType) {
        moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), this.action.nbProduct))
      } else {
        this.memorize(MemoryType.IsDonationInProgress, true)
      }
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isDonationInProgress) {
      this.memorize(MemoryType.Counter, this.nbProductsDonated + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.action?.productType) {
        this.memorize<number>(MemoryType.CounterActions, (old) => old + 1)
        if (this.remind(MemoryType.CounterActions) === this.action.nbTimes) {
          return this.removeActionAndMove()
        }
      } else if (this.remind(MemoryType.Counter) === this.nbProduct) {
        this.memorize(MemoryType.Counter, 0)
        this.memorize(MemoryType.IsDonationInProgress, false)
        this.memorize<number>(MemoryType.CounterActions, (old) => old + 1)
        if (this.remind(MemoryType.CounterActions) === this.action?.nbTimes) {
          return this.removeActionAndMove()
        }
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.TakeLetterToSwapProduct)(move)) {
      return [
        this.playerLetters.moveItem({ type: LocationType.LetterDeck }),
        ...this.addActionBonusAndMove({ type: ActionType.ProductSwap, nbPossibleSwaps: 1 })
      ]
    }
    return []
  }

  get playerProducts() {
    if (!this.action?.productType) {
      return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
    }
    return this.material(MaterialType.Product).id(this.action.productType).location(LocationType.PlayerProducts).player(this.player)
  }

  get starTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get nbStars() {
    return this.action?.nbStars ?? 0
  }

  get nbProduct() {
    return this.action?.nbProduct ?? 0
  }
}
