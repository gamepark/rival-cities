import { AllianceCard } from '@gamepark/rival-cities/material/AllianceCard'
import { AllianceCardDescription } from '../../AllianceCardDescription'
import DeutchAllianceAmsterdam from '../../../images/cards/alliance/de/AllianceAmsterdam.jpg'
import DeutchAllianceBruxelles from '../../../images/cards/alliance/de/AllianceBruxelles.jpg'
import DeutchAllianceGdansk from '../../../images/cards/alliance/de/AllianceGdansk.jpg'
import DeutchAllianceKjjobenhavn from '../../../images/cards/alliance/de/AllianceKjobenhavn.jpg'
import DeutchAllianceLeHavre from '../../../images/cards/alliance/de/AllianceLeHavre.jpg'
import DeutchAllianceLondon from '../../../images/cards/alliance/de/AllianceLondon.jpg'
import DeutchAllianceNovgorod from '../../../images/cards/alliance/de/AllianceNovgorod.jpg'
import DeutchAllianceOslo from '../../../images/cards/alliance/de/AllianceOslo.jpg'

export class DeutchAllianceCardDescription extends AllianceCardDescription {

  images = {
    [AllianceCard.AllianceAmsterdam]: DeutchAllianceAmsterdam,
    [AllianceCard.AllianceBruxelles]: DeutchAllianceBruxelles,
    [AllianceCard.AllianceGdansk]: DeutchAllianceGdansk,
    [AllianceCard.AllianceKjjobenhavn]: DeutchAllianceKjjobenhavn,
    [AllianceCard.AllianceLeHavre]: DeutchAllianceLeHavre,
    [AllianceCard.AllianceLondon]: DeutchAllianceLondon,
    [AllianceCard.AllianceNovgorod]: DeutchAllianceNovgorod,
    [AllianceCard.AllianceOslo]: DeutchAllianceOslo
  }
}

export const deutchAllianceCardDescription = new DeutchAllianceCardDescription()
