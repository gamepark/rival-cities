import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Action, AdvanceLawsuitAction, DrawSpecialActionCardAction, EarnPrestigeAction, FormAllianceAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { AllianceCard } from '../../material/AllianceCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class FormAllianceActionRule extends ActionRule<FormAllianceAction> {
  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    moves.push(...this.allianceCards.moveItems({ type: LocationType.PlayerAllianceCards, player: this.player }))
    if (this.playerLetters.length) {
      moves.push(...this.opponentAllianceCards.moveItems({ type: LocationType.PlayerAllianceCards, player: this.player }))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
      const oldLocationType = this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.location.type
      if (oldLocationType === LocationType.PlayerAllianceCards) {
        return [this.playerLetters.moveItem(() => ({ type: LocationType.LetterDeck }))]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      this.updateAction(this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.id as AllianceCard)
      return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.removeActionAndMove())
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move) && this.isSameAction(move.data)) {
      this.forget(MemoryType.ProductChoosen)
      return this.removeActionAndMove()
    }
    return []
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get allianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.AllianceCardsLayout)
  }

  get opponentAllianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.nextPlayer)
  }

  updateAction(alliance: AllianceCard): void {
    const action = this.remind<Action[]>(MemoryType.Actions)[0]
    if (alliance === AllianceCard.AllianceBruxelles) {
      if (action.type === ActionType.Computed) {
        const prestigeAction: EarnPrestigeAction | undefined = action.actions?.find((a) => a.type === ActionType.EarnPrestige) as EarnPrestigeAction
        if (prestigeAction) {
          prestigeAction.playerCanUseAllianceBruxelles = true
        }
      }
    }
    if (alliance === AllianceCard.AllianceLeHavre) {
      if (action.type === ActionType.Computed) {
        const lawsuitAction: AdvanceLawsuitAction | undefined = action.actions?.find((a) => a.type === ActionType.AdvanceLawsuit) as AdvanceLawsuitAction
        if (lawsuitAction) {
          lawsuitAction.playerCanUseAllianceLeHavre = true
        }
      }
    }
    if (alliance === AllianceCard.AllianceKjjobenhavn) {
      if (action.type === ActionType.Computed) {
        const drawSpecialActionCardAction: DrawSpecialActionCardAction | undefined = action.actions?.find(
          (a) => a.type === ActionType.DrawSpecialActionCard
        ) as DrawSpecialActionCardAction
        if (drawSpecialActionCardAction) {
          drawSpecialActionCardAction.playerCanUseAllianceKjjobenhavn = true
        }
      }
    }
  }
}
