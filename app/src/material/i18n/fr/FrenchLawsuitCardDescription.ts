import { LawsuitCard } from '@gamepark/rival-cities/material/LawsuitCard'
import { LawsuitCardDescription } from '../../LawsuitCardDescription'
import FrenchLawsuit1 from '../../../images/cards/lawsuit/fr/Lawsuit01.jpg'
import FrenchLawsuit2 from '../../../images/cards/lawsuit/fr/Lawsuit02.jpg'
import FrenchLawsuit3 from '../../../images/cards/lawsuit/fr/Lawsuit03.jpg'
import FrenchLawsuit4 from '../../../images/cards/lawsuit/fr/Lawsuit04.jpg'
import FrenchLawsuit5 from '../../../images/cards/lawsuit/fr/Lawsuit05.jpg'
import FrenchLawsuit6 from '../../../images/cards/lawsuit/fr/Lawsuit06.jpg'
import FrenchLawsuit7 from '../../../images/cards/lawsuit/fr/Lawsuit07.jpg'
import FrenchLawsuit8 from '../../../images/cards/lawsuit/fr/Lawsuit08.jpg'
import FrenchLawsuit9 from '../../../images/cards/lawsuit/fr/Lawsuit09.jpg'
import FrenchLawsuit10 from '../../../images/cards/lawsuit/fr/Lawsuit10.jpg'

export class FrenchLawsuitCardDescription extends LawsuitCardDescription {
  images = {
    [LawsuitCard.Lawsuit1]: FrenchLawsuit1,
    [LawsuitCard.Lawsuit2]: FrenchLawsuit2,
    [LawsuitCard.Lawsuit3]: FrenchLawsuit3,
    [LawsuitCard.Lawsuit4]: FrenchLawsuit4,
    [LawsuitCard.Lawsuit5]: FrenchLawsuit5,
    [LawsuitCard.Lawsuit6]: FrenchLawsuit6,
    [LawsuitCard.Lawsuit7]: FrenchLawsuit7,
    [LawsuitCard.Lawsuit8]: FrenchLawsuit8,
    [LawsuitCard.Lawsuit9]: FrenchLawsuit9,
    [LawsuitCard.Lawsuit10]: FrenchLawsuit10
  }
}

export const frenchLawsuitCardDescription = new FrenchLawsuitCardDescription()
