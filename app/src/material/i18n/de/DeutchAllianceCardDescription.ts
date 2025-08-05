import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import DeutchAllianceAmsterdam from '../../../images/cards/alliance/de/AllianceAmsterdam.jpg'
import DeutchAllianceBruxelles from '../../../images/cards/alliance/de/AllianceBruxelles.jpg'
import DeutchAllianceGdansk from '../../../images/cards/alliance/de/AllianceGdansk.jpg'
import DeutchAllianceKjjobenhavn from '../../../images/cards/alliance/de/AllianceKjobenhavn.jpg'
import DeutchAllianceLeHavre from '../../../images/cards/alliance/de/AllianceLeHavre.jpg'
import DeutchAllianceLondon from '../../../images/cards/alliance/de/AllianceLondon.jpg'
import DeutchAllianceNovgorod from '../../../images/cards/alliance/de/AllianceNovgorod.jpg'
import DeutchAllianceOslo from '../../../images/cards/alliance/de/AllianceOslo.jpg'
import { AllianceCardDescription } from '../../AllianceCardDescription'

export class DeutchAllianceCardDescription extends AllianceCardDescription {
  images = {
    [Alliance.Amsterdam]: DeutchAllianceAmsterdam,
    [Alliance.Bruxelles]: DeutchAllianceBruxelles,
    [Alliance.Gdansk]: DeutchAllianceGdansk,
    [Alliance.Kjjobenhavn]: DeutchAllianceKjjobenhavn,
    [Alliance.LeHavre]: DeutchAllianceLeHavre,
    [Alliance.London]: DeutchAllianceLondon,
    [Alliance.Novgorod]: DeutchAllianceNovgorod,
    [Alliance.Oslo]: DeutchAllianceOslo
  }
}

export const deutchAllianceCardDescription = new DeutchAllianceCardDescription()
