import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../constantes'
import { Action, ActionType } from '../material/Action'
import { BasicActionCard } from '../material/BasicActionCard'
import { BasicActionCardHelper } from '../material/helper/BasicActionCardHelper'
import { SpecialActionCardHelper } from '../material/helper/SpecialActionCardHelper'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpecialActionCard } from '../material/SpecialActionCard'
import { CustomMoveType } from './CustomMoveType'
import { ActionRuleIds } from './helper/ActionRuleIds'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.IsUseLetter, false)
    if (specialActionCardPlaces.includes(this.inkjarLocationId)) {
      return []
    }
    if (this.playerSpecialActionCards.length === 0) {
      const actions = this.inkJarCardActions
      this.memorize(MemoryType.Actions, actions)
      return [this.startRule(ActionRuleIds[actions[0].type])]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.playerCanUseLetter) {
      moves.push(...this.playerLetters.moveItems({ type: LocationType.LetterDeck }))
    }
    moves.push(...this.playerSpecialActionCards.moveItems({ type: LocationType.SpecialActionCardsDiscard }))
    moves.push(this.customMove(CustomMoveType.PlaysInkjarCard, this.inkjarLocationId))
    if (specialActionCardPlaces.includes(this.inkjarLocationId) && !this.remind(MemoryType.IsUseLetter)) {
      moves.push(this.specialActioncardInInkjarPlace.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player }))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize(MemoryType.IsUseLetter, true)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) {
      const actions: Action[] = []
      const cardId = this.material(MaterialType.SpecialActionCard).index(move.itemIndex).getItem()?.id as SpecialActionCard
      actions.push(...new SpecialActionCardHelper(this.game).getCardActions(cardId))
      if (this.remind(MemoryType.IsUseLetter) || this.playerHaveShip18) {
        actions.push(...this.inkJarCardActions)
      }
      this.memorize(MemoryType.Actions, actions)
      return [this.startRule(ActionRuleIds[actions[0].type])]
    }
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.PlayerSpecialActionCardsHand) {
      return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer)]
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.PlaysInkjarCard)(move)) {
      const actions = this.inkJarCardActions
      if (this.remind(MemoryType.IsUseLetter) || this.playerHaveShip18) {
        actions.push({ type: ActionType.ChooseSpecialActionCard })
      }
      this.memorize(MemoryType.Actions, actions)
      return [this.startRule(ActionRuleIds[actions[0].type])]
    }
    return []
  }

  get inkJarCardActions(): Action[] {
    if (this.inkjarLocationId === 0) return [{ type: ActionType.GainProducts, quantity: 1, product: undefined, isGift: true }]
    if (specialActionCardPlaces.includes(this.inkjarLocationId)) {
      const cardId = this.specialActioncardInInkjarPlace.getItem()?.id as SpecialActionCard
      return new SpecialActionCardHelper(this.game).getCardActions(cardId)
    }
    const cardId = this.basicActioncardInInkjarPlace.getItem()?.id as BasicActionCard
    return [new BasicActionCardHelper(this.game).getCardAction(cardId)]
  }

  get playerCanUseLetter() {
    return this.playerLetters.length > 0 && !this.remind(MemoryType.IsUseLetter) && this.playerSpecialActionCards.getQuantity() > 0 && !this.playerHaveShip18
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get playerSpecialActionCards() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.PlayerSpecialActionCardsHand).player(this.player)
  }

  get inkjarLocationId(): number {
    return this.material(MaterialType.InkJar).location(LocationType.InkJarPiste).getItem()?.location.id as number
  }

  get specialActioncardInInkjarPlace() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.CardPiste)
      .filter((it) => it.location.id === this.inkjarLocationId)
  }

  get basicActioncardInInkjarPlace() {
    return this.material(MaterialType.BasicActionCard)
      .location(LocationType.CardPiste)
      .filter((it) => it.location.id === this.inkjarLocationId)
  }

  get playerHaveShip18() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(18).length > 0
  }
}
