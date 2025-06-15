import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, Location, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { AllianceCard, AllianceData, allianceDatas } from '../../material/AllianceCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

type AlliancePay = {
  id: AllianceCard
  cost: {
    product?: Product | 'Letter'
    amount: number
  }
  alreadyPay: number
}

export class OffSeasonPayForAllianceRule extends SimultaneousRule {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.game.players.forEach((player) => {
      this.memorize(MemoryType.AlliancePay, [], player)
      if(this.getPlayerAlliances(player).length === 0) {
        moves.push(this.endPlayerTurn(player))
      }
    })
    return moves
  }

  getActivePlayerLegalMoves(player: number): MaterialMove[] {
    const moves: MaterialMove[] = []
    const allianceToPay = this.remind(MemoryType.AlliancePay, player).find((it: AlliancePay) => it.alreadyPay < it.cost.amount)
    if (allianceToPay) {
      if (allianceToPay.cost.product === 'Letter') {
        return this.getPlayerLetters(player).moveItems({ type: LocationType.LetterDeck, player })
      }
      if (allianceToPay.cost.product) {
        return this.getPlayerProduct(player)
          .id(allianceToPay.cost.product)
          .moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id, player }))
      }
      return this.getPlayerProduct(player).moveItems((it) => ({ type: LocationType.ProductPiles, id: it.id, player }))
    }
    this.getPlayerAlliances(player).forEach((it) => {
      const allianceData = allianceDatas[it.id as AllianceCard]
    if (this.checkIfPlayerHasEnougthProducts(player, allianceData) && !this.getPlayerAlrdeadyPayedAlliance(player).find((pay) => pay.id === it.id)) {
        const alliancePay: AlliancePay = {
          id: it.id,
          cost: allianceData.cost,
          alreadyPay: 0
        }
        moves.push(this.customMove(CustomMoveType.PayForAlliance, { pay: alliancePay, player }))
      }
      this.possiblePlaces().forEach((loc) => {
        moves.push(
          this.material(MaterialType.AllianceCard)
            .location(LocationType.PlayerAllianceCards)
            .id(it.id)
            .moveItem({ ...loc, player })
        )
      })
    })
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItemType(MaterialType.Product)(move)) {
      const alliancePays = this.remind<AlliancePay[]>(MemoryType.AlliancePay, move.location.player)
      const alliancePay = alliancePays.find((it: AlliancePay) => it.alreadyPay < it.cost.amount)
      if (alliancePay) {
        alliancePay.alreadyPay += 1
        this.memorize(MemoryType.AlliancePay, alliancePays, move.location.player)
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.AllianceCard)(move)) {
      if (this.getPlayerAlliances(move.location.player!).length === 0) {
        return [this.endPlayerTurn(move.location.player!)]
      }
    }
    if (isMoveItemType(MaterialType.Product)(move)) {
      if (this.getPlayerAlrdeadyPayedAlliance(move.location.player!).length === this.getPlayerAlliances(move.location.player!).length) {
        return [this.endPlayerTurn(move.location.player!)]
      }
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.PayForAlliance)(move)) {
      this.memorize<AlliancePay[]>(MemoryType.AlliancePay, (alliancePays) => [...alliancePays, move.data.pay], move.data.player)
    }
    return []
  }

  possiblePlaces(): Location[] {
    const locations: Location[] = []
    for (let i = 0; i < 4; i++) {
      if (this.material(MaterialType.AllianceCard).location((loc) => loc.type === LocationType.AllianceCardsLayout && loc.x === i).length === 0) {
        locations.push({ type: LocationType.AllianceCardsLayout, x: i })
      }
    }
    return locations
  }

  checkIfPlayerHasEnougthProducts(player: number, allianceData: AllianceData): boolean {
    if (allianceData.cost.product === 'Letter') {
      return this.getPlayerLetters(player).getQuantity() >= allianceData.cost.amount
    }
    if (allianceData.cost.product) {
      return this.getPlayerProduct(player).id(allianceData.cost.product).getQuantity() >= allianceData.cost.amount
    }
    return this.getPlayerProduct(player).getQuantity() >= allianceData.cost.amount
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    return [this.startRule(RuleId.OffSeasonGetShipsBonuses)]
  }

  getPlayerLetters(player: number) {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(player)
  }

  getPlayerProduct(player: number) {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(player)
  }

  getPlayerAlliances(player: number) {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(player).getItems()
  }

  getPlayerAlrdeadyPayedAlliance(player: number): AlliancePay[] {
    return this.remind<AlliancePay[]>(MemoryType.AlliancePay, player).filter((it: AlliancePay) => it.alreadyPay >= it.cost.amount)
  }
}
