import { MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { City } from '../../City'
import { Lawsuit, lawsuitData } from '../../material/Lawsuit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class AdvanceLawsuitHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: number | undefined = game.rule?.player
  ) {
    super(game)
  }

  checkIfCanAdvanceInLawsuit(itemId: Lawsuit, parent: number) {
    if (!itemId) return false
    const cost = lawsuitData[itemId].cost
    let haveSuffisantProducts = true
    cost.forEach((cost) => {
      if (cost.type === 'Letter') {
        if (this.playerLetters.getQuantity() < cost.quantity) {
          haveSuffisantProducts = false
        }
      } else {
        if (this.playerProducts.id(cost.type).getQuantity() < cost.quantity) {
          haveSuffisantProducts = false
        }
      }
    })
    const marker = this.material(MaterialType.LawsuitMarker).location(LocationType.LawsuitMarkerSpace).parent(parent)
    return haveSuffisantProducts && this.checkMarkerIsNotAtMaxX(marker.getItem()!)
  }

  checkMarkerIsNotAtMaxX(marker: MaterialItem): boolean {
    const markerLocationX = marker.location.x ?? 0
    if (this.player === City.Altona) {
      return markerLocationX > -4
    }
    return markerLocationX < 4
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }
}
