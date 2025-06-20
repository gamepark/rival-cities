import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ShipCard } from '../material/ShipCard'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class AdvanceInkJarRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    for (let i = 1; i <= this.possiblesNbCaseToAdvance(); i++) {
      moves.push(
        this.inkjar.moveItem(({ location }) => {
          let targetId = (location.id as number) + i
          targetId = targetId > 19 ? targetId - 20 : targetId
          return { ...location, id: targetId }
        })
      )
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.InkJar)(move)) return []
    const startId = this.material(MaterialType.InkJar).index(move.itemIndex).getItem()?.location.id ?? 0
    const endId = move.location.id as number
    const nbCaseAdvanced = endId > startId ? endId - startId : endId + 20 - startId
    this.memorize(MemoryType.NbProductToPayForAdvance, this.determineNbProductToPay(nbCaseAdvanced))
    if (endId < startId) {
      this.memorize(MemoryType.IsOffSeason, true)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.InkJar)(move)) return []
    if (this.remind(MemoryType.NbProductToPayForAdvance) > 0) {
      return [this.startRule(RuleId.PayProductForAdvance)]
    }
    return [this.startRule(this.remind(MemoryType.IsOffSeason) ? RuleId.OffSeasonTakeBell : RuleId.ChooseAction)]
  }

  possiblesNbCaseToAdvance() {
    const nbFreeCases = this.playerShip17.length ? 3 : 2
    let nbMovesForProducts = 0
    for (let i = 1; i <= this.playerProducts.getQuantity(); i++) {
      if (i < nbFreeCases + 1) {
        nbMovesForProducts += 1
      } else {
        nbMovesForProducts += 0.5
      }
    }

    return nbFreeCases + Math.floor(nbMovesForProducts)
  }

  get inkjar() {
    return this.material(MaterialType.InkJar).location(LocationType.InkJarPiste)
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  private determineNbProductToPay(nbCaseAdvanced: number) {
    const nbFreeCases = this.playerShip17.length ? 3 : 2
    let nbProducts = 0
    for (let i = nbFreeCases + 1; i <= nbCaseAdvanced; i++) {
      if (i <= 4) {
        nbProducts += 1
      } else {
        nbProducts += 2
      }
    }
    return nbProducts
  }

  get playerShip17() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship17)
  }
}
