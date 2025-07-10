import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard } from '../../material/ShipCard'

export class InkJarPisteHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: number | undefined = game.rule?.player
  ) {
    super(game)
  }

  possibleInkjarLocation(): Location[] {
    const locations: Location[] = []
    for (let i = 1; i <= this.possiblesNbCaseToAdvance(); i++) {
      const inkjarLocation = this.inkjar.getItem()?.location
      if (inkjarLocation) {
        let targetId = (inkjarLocation.id as number) + i
        targetId = targetId > 19 ? targetId - 20 : targetId
        locations.push({ ...inkjarLocation, id: targetId })
      }
    }
    return locations
  }

  possiblesNbCaseToAdvance() {
    const nbFreeCases = this.playerShip17.length ? 3 : 2
    let nbMovesForProducts = 0
    for (let i = nbFreeCases - 1; i <= this.playerProducts.getQuantity(); i++) {
      if (i < nbFreeCases + 1) {
        nbMovesForProducts += 1
      } else {
        nbMovesForProducts += 0.5
      }
    }
    console.log(nbFreeCases)
    console.log(nbMovesForProducts)
    return nbFreeCases + Math.floor(nbMovesForProducts)
  }

  determineNbProductToPay(nbCaseAdvanced: number) {
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

  get inkjar() {
    return this.material(MaterialType.InkJar).location(LocationType.InkJarPiste)
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerShip17() {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(this.player).id(ShipCard.Ship17)
  }
}
