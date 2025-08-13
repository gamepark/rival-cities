import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class ReactivateFactoriesRule extends PlayerTurnRule {
  onRuleStart() {
    const factories = this.material(MaterialType.Factory).location(LocationType.PlayerFactories).rotation(true)
    const moves: MaterialMove[] = [factories.moveItemsAtOnce({ rotation: false })]
    if (this.allShipsArePurchased || this.allLawsuitsAreResolved || this.allFactoriesAreTaken || this.allStarTokenAreTaken) {
      moves.push(this.endGame())
    } else {
      const player = this.material(MaterialType.BellToken).getItem()!.location.player!
      moves.push(this.startPlayerTurn(RuleId.ReturnBell, player))
    }
    return moves
  }

  get allShipsArePurchased() {
    return this.material(MaterialType.ShipCard).location(LocationType.ShipSpace).length === 0
  }

  get allLawsuitsAreResolved() {
    return this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).length === 0
  }

  get allStarTokenAreTaken() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck).length === 0
  }

  get allFactoriesAreTaken() {
    return this.material(MaterialType.Factory).location(LocationType.FactoryDeck).length === 0
  }
}
