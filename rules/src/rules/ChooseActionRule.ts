import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../constantes'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ShipCard } from '../material/ShipCard'
import { SpecialActionCard, spectialActionCardActions } from '../material/SpecialActionCard'
import { CustomMoveType } from './CustomMoveType'
import { NextRuleHelper } from './helper/NextRuleHelper'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.IsUseLetter, false)
    if (specialActionCardPlaces.includes(this.inkjarLocationId) && this.cardInInkjarPlace.length > 0) {
      return [
        this.cardInInkjarPlace.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player }),
        ...this.nextRuleHelper.moveToNextRule()
      ]
    }
    if (this.playerSpecialActionCards.length === 0) {
      return [this.startRule(RuleId.BasicAction)]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(this.playerLetters.length > 0 && !this.remind(MemoryType.IsUseLetter)) {
      moves.push(...this.playerLetters.moveItems({ type: LocationType.LetterDeck }))
    }
    moves.push(...this.playerSpecialActionCards.moveItems({ type: LocationType.SpecialActionCardsDiscard }))
    moves.push(this.customMove(CustomMoveType.PlaysBasicAction))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize(MemoryType.IsUseLetter, true)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) {
      const cardId = this.material(MaterialType.SpecialActionCard).index(move.itemIndex).getItem()?.id as SpecialActionCard
      this.memorize(MemoryType.ComputedActions, spectialActionCardActions[cardId])
      if(this.remind(MemoryType.IsUseLetter) || this.playerHaveShip18) {
        this.memorize(MemoryType.NextRules, [RuleId.SpecialAction, RuleId.BasicAction])
        return this.nextRuleHelper.moveToNextRule()
      }
      return [this.startRule(RuleId.SpecialAction)]
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.PlaysBasicAction)(move)) {
      if(this.remind(MemoryType.IsUseLetter) || this.playerHaveShip18) {
        this.memorize(MemoryType.NextRules, [RuleId.BasicAction, RuleId.ChooseSpecialAction])
        return this.nextRuleHelper.moveToNextRule()
      }
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

  get playerHaveShip18() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship18).length > 0
  }
}
