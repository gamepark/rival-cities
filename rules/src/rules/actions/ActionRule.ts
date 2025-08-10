import { CustomMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getRival } from '../../City'
import { Action } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export abstract class ActionRule<A extends Action> extends PlayerTurnRule {
  action: A

  constructor(game: MaterialGame, action?: A) {
    super(game)
    this.action = action ?? (this.actions[0] as A)
  }

  get actions(): Action[] {
    return this.remind<Action[]>(Memory.Actions)
  }

  endAction() {
    return this.customMove(CustomMoveType.EndAction)
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Pass || move.type === CustomMoveType.EndAction) {
      return [this.startNextRule()]
    }
    return []
  }

  addActions(...action: Action[]) {
    this.actions.splice(1, 0, ...action)
  }

  startNextRule() {
    const isRivalTurn = this.actions[0]?.isRivalTurn
    const willBeRivalTurn = this.actions[1]?.isRivalTurn
    if ((!isRivalTurn && !willBeRivalTurn) || (isRivalTurn && willBeRivalTurn)) {
      return this.startRule(this.nextRuleId)
    } else {
      return this.startPlayerTurn(this.nextRuleId, getRival(this.player))
    }
  }

  get nextRuleId() {
    if (this.actions.length < 2) {
      const pendingRule = this.remind<RuleId | undefined>(Memory.PendingRule)
      if (pendingRule) {
        this.forget(Memory.PendingRule)
        return pendingRule
      }
      return RuleId.ConfirmEndTurn
    }
    return ActionRuleIds[this.actions[1].type]
  }

  hasAlliance(alliance: Alliance, player = this.player) {
    return this.material(MaterialType.AllianceCard).id(alliance).getItem()?.location.player === player
  }

  getProducts(player = this.player) {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(player)
  }

  getProduct(product: Product, player = this.player) {
    return this.getProducts(player).id(product)
  }

  canAffordAfterSpending(_product: Product) {
    return true
  }

  onRuleEnd() {
    this.memorize<Action[]>(Memory.Actions, (actions) => actions.slice(1))
    return []
  }
}
