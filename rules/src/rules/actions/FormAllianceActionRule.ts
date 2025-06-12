import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'

export class FormAllianceActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.allianceCards.moveItems({ type: LocationType.PlayerAllianceCards, player: this.player }))
    if (this.playerLetters.length) {
      moves.push(...this.opponentAllianceCards.moveItems({ type: LocationType.PlayerAllianceCards, player: this.player }))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItemType(MaterialType.AllianceCard)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.FormAlliance)
      const oldLocationType = this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.location.type
      if(oldLocationType === LocationType.PlayerAllianceCards) {
        return [this.playerLetters.moveItem(() => ({ type: LocationType.LetterDeck }))]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      return [...this.nextRuleHelper.moveToNextRule()]
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
}
