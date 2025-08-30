import { CustomMove, getEnumValues, isCustomMoveType, isMoveItem, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { Action, ActionType, SwapProduct } from '../../material/Action'
import { Alliance, alliancesData } from '../../material/Alliance'
import { AnyProductsCost, LettersCost, ProductCost } from '../../material/Cost'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SwapProductRule } from '../actions/SwapProductRule'
import { CustomMoveType } from '../CustomMoveType'
import { CostHelper } from '../helper/CostHelper'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export type AlliancesUpkeep = {
  currentAlliance?: Alliance
  cost: Partial<Record<Alliance, ProductCost | AnyProductsCost | LettersCost>>
}

export class PayAlliancesUpkeepRule extends SimultaneousRule {
  onRuleStart(): MaterialMove[] {
    if (this.activePlayers.length === 0) {
      return this.getMovesAfterPlayersDone()
    }
    for (const player of this.activePlayers) {
      const upkeep: AlliancesUpkeep = { cost: {} }
      for (const alliance of this.getAlliances(player)) {
        upkeep.cost[alliance.id] = structuredClone(alliancesData[alliance.id].cost)
      }
      this.memorize(Memory.AlliancesUpkeep, upkeep, player)
    }
    return []
  }

  getAlliances(player: City) {
    return this.material(MaterialType.AllianceCard).player(player).getItems<Alliance>()
  }

  getActivePlayerLegalMoves(player: number) {
    const swapProduct = this.remind<SwapProduct | undefined>(Memory.PlayerProductSwap, player)
    if (swapProduct) {
      return new SwapProductRule(this.game, swapProduct, player).getPlayerMoves()
    }
    const upkeep = this.remind<AlliancesUpkeep>(Memory.AlliancesUpkeep, player)
    if (upkeep.currentAlliance) {
      return this.getPlayerProducts(player).moveItems((item) => ({ type: LocationType.ProductSupply, id: item.id }), 1)
    } else {
      const moves: MaterialMove[] = []
      for (const alliance of getEnumValues(Alliance)) {
        const cost = upkeep.cost[alliance]
        if (cost) {
          moves.push(this.material(MaterialType.AllianceCard).id(alliance).moveItem({ type: LocationType.AllianceSpace }))
          if (new CostHelper(this.game).canPay(player, cost)) {
            moves.push(this.customMove(CustomMoveType.ChooseAlliance, alliance))
          }
        }
      }
      if (!moves.length) {
        moves.push(this.endPlayerTurn(player))
      }
      return moves
    }
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.ChooseAlliance)(move)) {
      const alliance = move.data as Alliance
      const player = this.material(MaterialType.AllianceCard).id(alliance).getItem()!.location.player!
      const upkeep = this.remind<AlliancesUpkeep>(Memory.AlliancesUpkeep, player)
      const cost = upkeep.cost[alliance]!
      upkeep.currentAlliance = alliance
      return new CostHelper(this.game).pay(player, cost)
    } else if (isCustomMoveType(CustomMoveType.SpendLetterToSwapProduct)) {
      const player = move.data as City
      const letters = this.material(MaterialType.Letter).player(player)
      this.memorize<SwapProduct>(Memory.PlayerProductSwap, { type: ActionType.SwapProduct, times: 1, isLetterSwap: true }, player)
      return [letters.moveItem({ type: LocationType.LetterSupply })]
    }
    return []
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move)) {
      const item = this.material(move.itemType).getItem(move.itemIndex)
      const player = item.location.player ?? move.location.player!
      const swapProduct = this.remind<SwapProduct | undefined>(Memory.PlayerProductSwap, player)
      if (swapProduct) {
        return new SwapProductRule(this.game, swapProduct, player).afterItemMove(move)
      }
      const upkeep = this.remind<AlliancesUpkeep>(Memory.AlliancesUpkeep, player)
      const alliance = upkeep.currentAlliance ?? (item.id as Alliance)
      if (move.itemType === MaterialType.AllianceCard) {
        upkeep.cost[alliance]!.amount = 0
      } else if (move.itemType === MaterialType.Product || move.itemType === MaterialType.Letter) {
        if (upkeep.cost[alliance]) {
          upkeep.cost[alliance]!.amount -= move.quantity ?? 1
        }
      }
      if (!upkeep.cost[alliance]?.amount) {
        delete upkeep.currentAlliance
        upkeep.cost[alliance] = undefined
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    const player = this.playerWithMostShip
    if (player) {
      this.memorize(Memory.PendingRule, RuleId.GainShipsIncome)
      this.memorize<Action[]>(Memory.Actions, [{ type: ActionType.EarnPrestige }])
      return [this.startPlayerTurn(RuleId.EarnPrestige, player)]
    } else {
      return [this.startRule(RuleId.GainShipsIncome)]
    }
  }

  get playerWithMostShip() {
    const ships = this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards)
    const altonaShips = ships.player(City.Altona).length
    const hamburgShips = ships.player(City.Hamburg).length
    return altonaShips > hamburgShips ? City.Altona : hamburgShips > altonaShips ? City.Hamburg : undefined
  }

  getPlayerProducts(player: number) {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(player)
  }
}
