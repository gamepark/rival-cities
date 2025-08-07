import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { DonationAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { Alliance } from '../../material/Alliance'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class DonationActionRule extends ActionRule<DonationAction> {
  nbProductsDonated: number = this.remind(MemoryType.Count) ?? 0
  isDonationInProgress = this.remind(MemoryType.IsDonationInProgress)

  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.action.nbProduct === 0) {
      const playerHaveAllianceAmsterdam = new AllianceCardHelper(this.game).checkPlayerAllianceCardById(Alliance.Amsterdam)
      moves.push(
        ...this.starTokens.moveItems(
          { type: LocationType.PlayerStarTokens, player: this.player },
          playerHaveAllianceAmsterdam ? this.nbStars + 1 : this.nbStars
        )
      )
    }
    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.playerProducts.getQuantity() < this.nbProduct) return [this.customMove(CustomMoveType.Pass, this.action)]
    if (this.isDonationInProgress) {
      moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id })))
    } else {
      if (this.nbProductsDonated < this.nbProduct && this.starTokens.length > 0) {
        const playerHaveAllianceAmsterdam = new AllianceCardHelper(this.game).checkPlayerAllianceCardById(Alliance.Amsterdam)
        moves.push(
          ...this.starTokens.moveItems(
            { type: LocationType.PlayerStarTokens, player: this.player },
            playerHaveAllianceAmsterdam ? this.nbStars + 1 : this.nbStars
          )
        )
      }
      moves.push(this.customMove(CustomMoveType.Pass, this.action))
      if (this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player).length && this.playerLetters.length) {
        moves.push(this.customMove(CustomMoveType.TakeLetterToSwapProduct))
      }
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      if (this.action.productType) {
        moves.push(...this.playerProducts.moveItems((item) => ({ type: LocationType.ProductPiles, id: item.id }), this.action.nbProduct))
      } else {
        this.memorize(MemoryType.IsDonationInProgress, true)
      }
    } else if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles && this.isDonationInProgress) {
      this.memorize(MemoryType.Count, this.nbProductsDonated + 1)
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Product)(move) && move.location.type === LocationType.ProductPiles) {
      if (this.action.productType) {
        this.memorize<number>(MemoryType.CounterActions, (old) => old + 1)
        if (this.remind(MemoryType.CounterActions) === this.action.nbTimes) {
          return [this.endAction()]
        }
      } else if (this.remind(MemoryType.Count) === this.nbProduct) {
        this.memorize(MemoryType.Count, 0)
        this.memorize(MemoryType.IsDonationInProgress, false)
        this.memorize<number>(MemoryType.CounterActions, (old) => old + 1)
        if (this.remind(MemoryType.CounterActions) === this.action.nbTimes) {
          return [this.endAction()]
        }
      }
    }
    if (isMoveItemType(MaterialType.StarToken)(move) && move.location.type === LocationType.PlayerStarTokens) {
      if (this.action.nbProduct === 0) {
        this.memorize(MemoryType.Count, 0)
        this.memorize(MemoryType.IsDonationInProgress, false)
        this.memorize<number>(MemoryType.CounterActions, 0)
        return [this.endAction()]
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.TakeLetterToSwapProduct)(move)) {
      return [this.playerLetters.moveItem({ type: LocationType.LetterDeck }), ...this.startAction({ type: ActionType.ProductSwap, nbPossibleSwaps: 1 })]
    } else if (move.type === CustomMoveType.Pass) {
      return this.removeActionAndMove()
    }
    return super.onCustomMove(move)
  }

  get playerProducts() {
    if (!this.action.productType) {
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
    return this.action.nbStars ?? 0
  }

  get nbProduct() {
    return this.action.nbProduct ?? 0
  }
}
