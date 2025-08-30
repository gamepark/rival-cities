import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { specialActionCardPlaces } from '../constantes'
import { Action, ActionType } from '../material/Action'
import { BasicAction, basicCardAction } from '../material/BasicAction'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Ship } from '../material/Ship'
import { SpecialAction, specialCardActions } from '../material/SpecialAction'
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
      moves.push(this.customMove(CustomMoveType.PlayInkJarCard)) // Option A
    }

    moves.push(...this.specialActionCards.moveItems({ type: LocationType.SpecialActionCardDiscard })) // Option B

    const letters = this.playerLetters
    if (letters.getQuantity() > 0 && this.hasSpecialActionCard && !this.isOptionCActive) {
      moves.push(...letters.moveItems({ type: LocationType.LetterSupply })) // Option C
    }

    if (specialActionCard.length && !this.remind(Memory.LetterSpentForOptionC)) {
      moves.push(specialActionCard.moveItem({ type: LocationType.PlayerHand, player: this.player })) // Option D
    }

    return moves
  }

  get isOptionCActive() {
    return this.remind<true | undefined>(Memory.LetterSpentForOptionC) ?? this.hasShip18
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    // Option A
    if (isCustomMoveType(CustomMoveType.PlayInkJarCard)(move)) {
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
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardDiscard) {
      const actions: Action[] = []
      const cardId = this.material(MaterialType.SpecialActionCard).getItem<SpecialAction>(move.itemIndex).id
      actions.push(...structuredClone(specialCardActions[cardId]))
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
    if (isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.PlayerHand) {
      return [this.startPlayerTurn(RuleId.AdvanceInkJar, this.nextPlayer)]
    }
    return []
  }

  get inkJarCardActions(): Action[] {
    if (this.inkJarLocationId === 0) {
      return [{ type: ActionType.GainProducts, quantity: 1, isGift: true }]
    } else if (specialActionCardPlaces.includes(this.inkJarLocationId)) {
      const specialAction = this.specialActionCard.getItem<SpecialAction>()!.id
      return structuredClone(specialCardActions[specialAction])
    } else {
      const basicAction = this.basicActionCard.getItem<BasicAction>()!.id
      return [structuredClone(basicCardAction[basicAction])]
    }
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetters).player(this.player)
  }

  get specialActionCards() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.PlayerHand).player(this.player)
  }

  get hasSpecialActionCard() {
    return this.specialActionCards.length > 0
  }

  get inkJarLocationId(): number {
    return this.material(MaterialType.InkJar).location(LocationType.InkSpace).getItem()?.location.id as number
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard).location(LocationType.ActionCardSpace).locationId(this.inkJarLocationId)
  }

  get basicActionCard() {
    return this.material(MaterialType.BasicActionCard).location(LocationType.ActionCardSpace).locationId(this.inkJarLocationId)
  }

  get hasShip18() {
    return this.material(MaterialType.ShipCard).id(Ship.Ship18).getItem()?.location.player === this.player
  }
}
