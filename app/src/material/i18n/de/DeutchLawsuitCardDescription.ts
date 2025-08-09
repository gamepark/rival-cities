import { Lawsuit } from '@gamepark/rival-cities/material/Lawsuit'
import DeutchLawsuit1 from '../../../images/cards/lawsuit/de/Lawsuit01.jpg'
import DeutchLawsuit2 from '../../../images/cards/lawsuit/de/Lawsuit02.jpg'
import DeutchLawsuit3 from '../../../images/cards/lawsuit/de/Lawsuit03.jpg'
import DeutchLawsuit4 from '../../../images/cards/lawsuit/de/Lawsuit04.jpg'
import DeutchLawsuit5 from '../../../images/cards/lawsuit/de/Lawsuit05.jpg'
import DeutchLawsuit6 from '../../../images/cards/lawsuit/de/Lawsuit06.jpg'
import DeutchLawsuit7 from '../../../images/cards/lawsuit/de/Lawsuit07.jpg'
import DeutchLawsuit8 from '../../../images/cards/lawsuit/de/Lawsuit08.jpg'
import DeutchLawsuit9 from '../../../images/cards/lawsuit/de/Lawsuit09.jpg'
import DeutchLawsuit10 from '../../../images/cards/lawsuit/de/Lawsuit10.jpg'
import { LawsuitCardDescription } from '../../LawsuitCardDescription'

export class DeutchLawsuitCardDescription extends LawsuitCardDescription {
  images = {
    [Lawsuit.Lawsuit1]: DeutchLawsuit1,
    [Lawsuit.Lawsuit2]: DeutchLawsuit2,
    [Lawsuit.Lawsuit3]: DeutchLawsuit3,
    [Lawsuit.Lawsuit4]: DeutchLawsuit4,
    [Lawsuit.Lawsuit5]: DeutchLawsuit5,
    [Lawsuit.Lawsuit6]: DeutchLawsuit6,
    [Lawsuit.Lawsuit7]: DeutchLawsuit7,
    [Lawsuit.Lawsuit8]: DeutchLawsuit8,
    [Lawsuit.Lawsuit9]: DeutchLawsuit9,
    [Lawsuit.Lawsuit10]: DeutchLawsuit10
  }
}

export const deutchLawsuitCardDescription = new DeutchLawsuitCardDescription()
