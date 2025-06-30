import { AllianceCard } from '@gamepark/rival-cities/material/AllianceCard'
import { AllianceCardDescription } from '../../AllianceCardDescription'
import FrenchAllianceAmsterdam from '../../../images/cards/alliance/fr/AllianceAmsterdam.jpg'
import FrenchAllianceBruxelles from '../../../images/cards/alliance/fr/AllianceBruxelles.jpg'
import FrenchAllianceGdansk from '../../../images/cards/alliance/fr/AllianceGdansk.jpg'
import FrenchAllianceKjjobenhavn from '../../../images/cards/alliance/fr/AllianceKjjobenhavn.jpg'
import FrenchAllianceLeHavre from '../../../images/cards/alliance/fr/AllianceLeHavre.jpg'
import FrenchAllianceLondon from '../../../images/cards/alliance/fr/AllianceLondon.jpg'
import FrenchAllianceNovgorod from '../../../images/cards/alliance/fr/AllianceNovgorod.jpg'
import FrenchAllianceOslo from '../../../images/cards/alliance/fr/AllianceOslo.jpg'

export class FrenchAllianceCardDescription extends AllianceCardDescription {
  images = {
    [AllianceCard.AllianceAmsterdam]: FrenchAllianceAmsterdam,
    [AllianceCard.AllianceBruxelles]: FrenchAllianceBruxelles,
    [AllianceCard.AllianceGdansk]: FrenchAllianceGdansk,
    [AllianceCard.AllianceKjjobenhavn]: FrenchAllianceKjjobenhavn,
    [AllianceCard.AllianceLeHavre]: FrenchAllianceLeHavre,
    [AllianceCard.AllianceLondon]: FrenchAllianceLondon,
    [AllianceCard.AllianceNovgorod]: FrenchAllianceNovgorod,
    [AllianceCard.AllianceOslo]: FrenchAllianceOslo
  }
}

export const frenchAllianceCardDescription = new FrenchAllianceCardDescription()
