import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../constantes'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (specialActionCardPlaces.includes(this.inkjarLocationId) && this.cardInInkjarPlace.length > 0) {
      return [
        this.cardInInkjarPlace.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player }),
        this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer)
      ]
    }
    if (this.playerLetters.length === 0 && this.playerSpecialActionCards.length === 0) {
      return [this.startRule(RuleId.BasicAction)]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.playerSpecialActionCards.moveItems({ type: LocationType.SpecialActionCardsDiscard }))
    moves.push(this.customMove(CustomMoveType.PlaysBasicAction))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) {
      // TODO start rule SpecialAction
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.PlaysBasicAction)(move)) {
      return [this.startRule(RuleId.BasicAction)]
    }
    return []
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get playerSpecialActionCards() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.PlayerSpecialActionCardsHand).player(this.player)
  }

  get inkjarLocationId(): number {
    return this.material(MaterialType.InkJar).location(LocationType.InkJarPiste).getItem()?.location.id
  }

  get cardInInkjarPlace() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.CardPiste)
      .filter((it) => it.location.id === this.inkjarLocationId)
  }
}
