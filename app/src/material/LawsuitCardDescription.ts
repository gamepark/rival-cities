import { CardDescription } from '@gamepark/react-game'
import { LawsuitCard } from '@gamepark/rival-cities/material/LawsuitCard'
import Lawsuit1 from '../images/cards/lawsuit/en/Lawsuit01.jpg'
import Lawsuit2 from '../images/cards/lawsuit/en/Lawsuit02.jpg'
import Lawsuit3 from '../images/cards/lawsuit/en/Lawsuit03.jpg'
import Lawsuit4 from '../images/cards/lawsuit/en/Lawsuit04.jpg'
import Lawsuit5 from '../images/cards/lawsuit/en/Lawsuit05.jpg'
import Lawsuit6 from '../images/cards/lawsuit/en/Lawsuit06.jpg'
import Lawsuit7 from '../images/cards/lawsuit/en/Lawsuit07.jpg'
import Lawsuit8 from '../images/cards/lawsuit/en/Lawsuit08.jpg'
import Lawsuit9 from '../images/cards/lawsuit/en/Lawsuit09.jpg'
import Lawsuit10 from '../images/cards/lawsuit/en/Lawsuit10.jpg'
import LawsuitBack from '../images/cards/lawsuit/LawsuitBack.jpg'


export class LawsuitCardDescription extends CardDescription {
  width = 6.76
  height = 4.36

  backImage = LawsuitBack

  images = {
    [LawsuitCard.Lawsuit1]: Lawsuit1,
    [LawsuitCard.Lawsuit2]: Lawsuit2,
    [LawsuitCard.Lawsuit3]: Lawsuit3,
    [LawsuitCard.Lawsuit4]: Lawsuit4,
    [LawsuitCard.Lawsuit5]: Lawsuit5,
    [LawsuitCard.Lawsuit6]: Lawsuit6,
    [LawsuitCard.Lawsuit7]: Lawsuit7,
    [LawsuitCard.Lawsuit8]: Lawsuit8,
    [LawsuitCard.Lawsuit9]: Lawsuit9,
    [LawsuitCard.Lawsuit10]: Lawsuit10
  }
}

export const lawsuitCardDescription = new LawsuitCardDescription()
