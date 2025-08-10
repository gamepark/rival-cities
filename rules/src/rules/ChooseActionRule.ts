import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../constantes'
import { Action, ActionType } from '../material/Action'
import { BasicAction } from '../material/BasicAction'
import { BasicActionCardHelper } from '../material/helper/BasicActionCardHelper'
import { SpecialActionCardHelper } from '../material/helper/SpecialActionCardHelper'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Ship } from '../material/Ship'
import { SpecialAction } from '../material/SpecialAction'
import { CustomMoveType } from './CustomMoveType'
import { ActionRuleIds } from './helper/ActionRuleIds'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (!specialActionCardPlaces.includes(this.inkJarLocationId) && !this.hasSpecialActionCard) {
      return [this.playActions(this.inkJarCardActions)]
    }
    return []
  }

  playActions(actions: Action[]) {
    this.memorize(Memory.Actions, actions)
    return this.startRule(ActionRuleIds[actions[0].type])
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []

    const isSpecialActionLocation = specialActionCardPlaces.includes(this.inkJarLocationId)
    const specialActionCard = this.specialActionCard

    if (!isSpecialActionLocation || specialActionCard.length) {
      moves.push(this.customMove(CustomMoveType.PlaysInkjarCard)) // Option A
    }

    moves.push(...this.specialActionCards.moveItems({ type: LocationType.SpecialActionCardsDiscard })) // Option B

    const letters = this.playerLetters
    if (letters.getQuantity() > 0 && this.hasSpecialActionCard && !this.isOptionCActive) {
      moves.push(...letters.moveItems({ type: LocationType.LetterDeck })) // Option C
    }

    if (specialActionCard.length && !this.remind(Memory.LetterSpentForOptionC)) {
      moves.push(specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })) // Option D
    }

    return moves
  }

  get isOptionCActive() {
    return this.remind(Memory.LetterSpentForOptionC) || this.hasShip18
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    // Option A
    if (isCustomMoveType(CustomMoveType.PlaysInkjarCard)(move)) {
      const actions = this.inkJarCardActions
      if (this.isOptionCActive) {
        actions.push({ type: ActionType.PlaySpecialActionCard })
      }
      return [this.playActions(actions)]
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    // Option B
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardsDiscard) {
      const actions: Action[] = []
      const cardId = this.material(MaterialType.SpecialActionCard).getItem<SpecialAction>(move.itemIndex).id
      actions.push(...new SpecialActionCardHelper(this.game).getCardActions(cardId))
      if (this.isOptionCActive) {
        actions.push(...this.inkJarCardActions)
        this.forget(Memory.LetterSpentForOptionC)
      }
      return [this.playActions(actions)]
    }

    // Option C
    if (isMoveItemType(MaterialType.Letter)(move)) {
      this.memorize(Memory.LetterSpentForOptionC, true)
    }

    // Option D
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.PlayerSpecialActionCardsHand) {
      return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer)]
    }
    return []
  }

  get inkJarCardActions(): Action[] {
    if (this.inkJarLocationId === 0) {
      return [{ type: ActionType.GainProducts, quantity: 1, isGift: true }]
    } else if (specialActionCardPlaces.includes(this.inkJarLocationId)) {
      const specialAction = this.specialActionCard.getItem<SpecialAction>()!.id
      return new SpecialActionCardHelper(this.game).getCardActions(specialAction)
    } else {
      const basicAction = this.basicActionCard.getItem<BasicAction>()!.id
      return [new BasicActionCardHelper(this.game).getCardAction(basicAction)]
    }
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get specialActionCards() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.PlayerSpecialActionCardsHand).player(this.player)
  }

  get hasSpecialActionCard() {
    return this.specialActionCards.length > 0
  }

  get inkJarLocationId(): number {
    return this.material(MaterialType.InkJar).location(LocationType.InkJarPiste).getItem()?.location.id as number
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.CardPiste).locationId(this.inkJarLocationId)
  }

  get basicActionCard() {
    return this.material(MaterialType.BasicActionCard).location(LocationType.CardPiste).locationId(this.inkJarLocationId)
  }

  get hasShip18() {
    return this.material(MaterialType.ShipCard).id(Ship.Ship18).getItem()?.location.player === this.player
  }
}
