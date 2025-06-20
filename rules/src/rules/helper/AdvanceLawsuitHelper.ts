import { MaterialGame, MaterialRulesPart } from "@gamepark/rules-api"
import { LawsuitCard, lawsuitCardData } from "../../material/LawsuitCard"
import { LocationType } from "../../material/LocationType"
import { MaterialType } from "../../material/MaterialType"

export class AdvanceLawsuitHelper extends MaterialRulesPart {

    constructor(
        game: MaterialGame,
        readonly player: number | undefined = game.rule?.player
    ) {
        super(game)
    }

    checkIfCanAdvanceInLawsuit(itemId: LawsuitCard) {
        if (!itemId) return false
        const lawsuitData = lawsuitCardData[itemId]
        let haveSuffisantProducts = true
        lawsuitData.cost.forEach((cost) => {
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
        return haveSuffisantProducts
    }

    get playerProducts() {
      return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
    }
  
    get playerLetters() {
      return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
    }
}
