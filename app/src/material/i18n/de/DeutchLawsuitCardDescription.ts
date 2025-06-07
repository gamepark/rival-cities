import { LawsuitCard } from '@gamepark/rival-cities/material/LawsuitCard'
import { LawsuitCardDescription } from '../../LawsuitCardDescription'
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

export class DeutchLawsuitCardDescription extends LawsuitCardDescription {
  width = 6.76
  height = 4.36

  images = {
    [LawsuitCard.Lawsuit1]: DeutchLawsuit1,
    [LawsuitCard.Lawsuit2]: DeutchLawsuit2,
    [LawsuitCard.Lawsuit3]: DeutchLawsuit3,
    [LawsuitCard.Lawsuit4]: DeutchLawsuit4,
    [LawsuitCard.Lawsuit5]: DeutchLawsuit5,
    [LawsuitCard.Lawsuit6]: DeutchLawsuit6,
    [LawsuitCard.Lawsuit7]: DeutchLawsuit7,
    [LawsuitCard.Lawsuit8]: DeutchLawsuit8,
    [LawsuitCard.Lawsuit9]: DeutchLawsuit9,
    [LawsuitCard.Lawsuit10]: DeutchLawsuit10
  }
}

export const deutchLawsuitCardDescription = new DeutchLawsuitCardDescription()
