import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, Location, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { Alliance, AllianceData, alliancesData } from '../../material/Alliance'
import { Cost, CostType } from '../../material/Cost'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export type AlliancePay = {
  id: Alliance
  cost: Cost
  alreadyPay: number
}

export class OffSeasonPayForAllianceRule extends SimultaneousRule {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.game.players.forEach((player) => {
      this.memorize(MemoryType.AlliancePay, [], player)
      if (this.getPlayerAlliances(player).length === 0) {
        moves.push(this.endPlayerTurn(player))
      }
    })
    return moves
  }

  getActivePlayerLegalMoves(player: number): MaterialMove[] {
    const moves: MaterialMove[] = []
    const allianceToPay = this.remind<AlliancePay[]>(MemoryType.AlliancePay, player).find((it: AlliancePay) => it.alreadyPay < it.cost.amount)
    if (allianceToPay) {
      return this.getPlayerProduct(player).moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id }))
    }
    this.getPlayerAlliances(player).forEach((it) => {
      const allianceData = alliancesData[it.id as Alliance]
      if (this.checkIfPlayerHasEnougthProducts(player, allianceData) && !this.getPlayerAlreadyPayedAlliance(player).find((pay) => pay.id === it.id)) {
        const alliancePay: AlliancePay = {
          id: it.id,
          cost: allianceData.cost,
          alreadyPay: 0
        }
        moves.push(this.customMove(CustomMoveType.PayForAlliance, { pay: alliancePay, player }))
      }
      if (!this.getPlayerAlreadyPayedAlliance(player).find((pay) => pay.id === it.id)) {
        this.possiblePlaces().forEach((loc) => {
          moves.push(this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).id(it.id).moveItem(loc))
        })
      }
    })
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Product)(move) || isMoveItemType(MaterialType.Letter)(move)) {
      const player =
        this.material(MaterialType.Letter).index(move.itemIndex).getItem()?.location.player ??
        this.material(MaterialType.Product).index(move.itemIndex).getItem()?.location.player
      const alliancePays: AlliancePay[] | undefined = this.remind<AlliancePay[]>(MemoryType.AlliancePay, player) ?? []
      const alliancePay = alliancePays.find((it: AlliancePay) => it.alreadyPay < it.cost.amount)
      if (alliancePay) {
        alliancePay.alreadyPay += move.quantity ?? 1
        this.memorize(MemoryType.AlliancePay, alliancePays, player)
      }
      if (this.getPlayerAlreadyPayedAlliance(player!).length === this.getPlayerAlliances(player!).length) {
        return [this.endPlayerTurn(player!)]
      }
    }
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      const player = this.material(MaterialType.AllianceCard).index(move.itemIndex).getItem()?.location.player
      if (this.getPlayerAlliances(player!).length - 1 === this.getPlayerAlreadyPayedAlliance(player!).length) {
        return [this.endPlayerTurn(player!)]
      }
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.PayForAlliance)(move)) {
      const payment = move.data as { pay: AlliancePay; player: City }
      this.memorize<AlliancePay[]>(MemoryType.AlliancePay, (alliancePays) => [...alliancePays, payment.pay], payment.player)

      if (payment.pay.cost.type === CostType.Letters) {
        return this.getPlayerLetters(payment.player).moveItems({ type: LocationType.LetterDeck })
      }
      if (payment.pay.cost.type === CostType.Product) {
        return this.getPlayerProduct(payment.player)
          .id(payment.pay.cost.product)
          .moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id }), payment.pay.cost.amount)
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    const playerWhoHaveBell = this.material(MaterialType.BellToken).getItem()!.location.player!
    return [this.startPlayerTurn(RuleId.OffSeasonPlayerWithMostShipCardsEarnPrestige, playerWhoHaveBell)]
  }

  possiblePlaces(): Location[] {
    const locations: Location[] = []
    for (let i = 0; i < 4; i++) {
      if (this.material(MaterialType.AllianceCard).location((loc) => loc.type === LocationType.AllianceSpace && loc.x === i).length === 0) {
        locations.push({ type: LocationType.AllianceSpace, x: i })
      }
    }
    return locations
  }

  checkIfPlayerHasEnougthProducts(player: number, allianceData: AllianceData): boolean {
    if (allianceData.cost.type === CostType.Letters) {
      return this.getPlayerLetters(player).getQuantity() >= allianceData.cost.amount
    }
    if (allianceData.cost.type === CostType.Product) {
      return this.getPlayerProduct(player).id(allianceData.cost.product).getQuantity() >= allianceData.cost.amount
    }
    return this.getPlayerProduct(player).getQuantity() >= allianceData.cost.amount
  }

  getPlayerLetters(player: number) {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(player)
  }

  getPlayerProduct(player: number) {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(player)
  }

  getPlayerAlliances(player: number) {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(player).getItems()
  }

  getPlayerAlreadyPayedAlliance(player: number): AlliancePay[] {
    return this.remind<AlliancePay[]>(MemoryType.AlliancePay, player)?.filter((it: AlliancePay) => it.alreadyPay >= it.cost.amount) ?? []
  }
}
