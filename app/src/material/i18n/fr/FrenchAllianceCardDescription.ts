import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import FrenchAllianceAmsterdam from '../../../images/cards/alliance/fr/AllianceAmsterdam.jpg'
import FrenchAllianceBruxelles from '../../../images/cards/alliance/fr/AllianceBruxelles.jpg'
import FrenchAllianceGdansk from '../../../images/cards/alliance/fr/AllianceGdansk.jpg'
import FrenchAllianceKjjobenhavn from '../../../images/cards/alliance/fr/AllianceKjjobenhavn.jpg'
import FrenchAllianceLeHavre from '../../../images/cards/alliance/fr/AllianceLeHavre.jpg'
import FrenchAllianceLondon from '../../../images/cards/alliance/fr/AllianceLondon.jpg'
import FrenchAllianceNovgorod from '../../../images/cards/alliance/fr/AllianceNovgorod.jpg'
import FrenchAllianceOslo from '../../../images/cards/alliance/fr/AllianceOslo.jpg'
import { AllianceCardDescription } from '../../AllianceCardDescription'

export class FrenchAllianceCardDescription extends AllianceCardDescription {
  images = {
    [Alliance.Amsterdam]: FrenchAllianceAmsterdam,
    [Alliance.Bruxelles]: FrenchAllianceBruxelles,
    [Alliance.Gdansk]: FrenchAllianceGdansk,
    [Alliance.Kjjobenhavn]: FrenchAllianceKjjobenhavn,
    [Alliance.LeHavre]: FrenchAllianceLeHavre,
    [Alliance.London]: FrenchAllianceLondon,
    [Alliance.Novgorod]: FrenchAllianceNovgorod,
    [Alliance.Oslo]: FrenchAllianceOslo
  }
}

export const frenchAllianceCardDescription = new FrenchAllianceCardDescription()
