import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Action, DrawSpecialActionCardAction, EarnPrestigeAction, FormAllianceAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { Alliance } from '../../material/Alliance'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class FormAllianceActionRule extends ActionRule<FormAllianceAction> {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.allianceCards.moveItems({ type: LocationType.PlayerAlliances, player: this.player }))
    if (this.playerLetters.length) {
      moves.push(...this.opponentAllianceCards.moveItems({ type: LocationType.PlayerAlliances, player: this.player }))
    }
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      const oldLocationType = this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.location.type
      if (oldLocationType === LocationType.PlayerAlliances) {
        return [this.playerLetters.moveItem(() => ({ type: LocationType.LetterDeck }))]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      this.updateAction(this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.id as Alliance)
      return new EndOfGameHelper(this.game).checkInstantEndOfGame([this.endAction()])
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move) && this.isSameAction(move.data as Action)) {
      this.forget(MemoryType.ProductChosen)
      return [this.endAction()]
    }
    return super.onCustomMove(move)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get allianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.AllianceSpace)
  }

  get opponentAllianceCards() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(this.nextPlayer)
  }

  updateAction(alliance: Alliance): void {
    const action = this.remind<Action[]>(MemoryType.Actions)[0]
    if (alliance === Alliance.Bruxelles) {
      if (action.type === ActionType.Multiple) {
        const prestigeAction: EarnPrestigeAction | undefined = action.actions.find((a) => a.type === ActionType.EarnPrestige) as EarnPrestigeAction
        if (prestigeAction) {
          prestigeAction.playerCanUseAllianceBruxelles = true
        }
      }
    }
    if (alliance === Alliance.Kjjobenhavn) {
      if (action.type === ActionType.Multiple) {
        const drawSpecialActionCardAction: DrawSpecialActionCardAction | undefined = action.actions.find(
          (a) => a.type === ActionType.DrawSpecialActionCard
        ) as DrawSpecialActionCardAction
        if (drawSpecialActionCardAction) {
          drawSpecialActionCardAction.playerCanUseAllianceKjjobenhavn = true
        }
      }
    }
  }
}
