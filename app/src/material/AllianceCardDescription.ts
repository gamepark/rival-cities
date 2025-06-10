import { CardDescription, ItemContext } from '@gamepark/react-game'
import { AllianceCard } from '@gamepark/rival-cities/material/AllianceCard'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import AllianceAmsterdam from '../images/cards/alliance/en/AllianceAmsterdam.jpg'
import AllianceBruxelles from '../images/cards/alliance/en/AllianceBruxelles.jpg'
import AllianceGdansk from '../images/cards/alliance/en/AllianceGdansk.jpg'
import AllianceKjjobenhavn from '../images/cards/alliance/en/AllianceKjjobenhavn.jpg'
import AllianceLeHavre from '../images/cards/alliance/en/AllianceLeHavre.jpg'
import AllianceLondon from '../images/cards/alliance/en/AllianceLondon.jpg'
import AllianceNovgorod from '../images/cards/alliance/en/AllianceNovgorod.jpg'
import AllianceOslo from '../images/cards/alliance/en/AllianceOslo.jpg'
import AllianceBack from '../images/cards/alliance/AllianceBack.jpg'

export class AllianceCardDescription extends CardDescription {
  width = 6.76
  height = 4.36

  backImage = AllianceBack

  images = {
    [AllianceCard.AllianceAmsterdam]: AllianceAmsterdam,
    [AllianceCard.AllianceBruxelles]: AllianceBruxelles,
    [AllianceCard.AllianceGdansk]: AllianceGdansk,
    [AllianceCard.AllianceKjjobenhavn]: AllianceKjjobenhavn,
    [AllianceCard.AllianceLeHavre]: AllianceLeHavre,
    [AllianceCard.AllianceLondon]: AllianceLondon,
    [AllianceCard.AllianceNovgorod]: AllianceNovgorod,
    [AllianceCard.AllianceOslo]: AllianceOslo
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.AllianceCard)(move) && move.itemIndex === context.index && move.location.player === context.player
  }
}

export const allianceCardDescription = new AllianceCardDescription()
