import { CardDescription } from '@gamepark/react-game'
import { BasicActionCard } from '@gamepark/rival-cities/material/BasicActionCard'
import BasicAction1 from '../images/cards/action/basic/en/ActionBasic01.jpg'
import BasicAction2 from '../images/cards/action/basic/ActionBasic02.jpg'
import BasicAction3 from '../images/cards/action/basic/en/ActionBasic03.jpg'
import BasicAction4 from '../images/cards/action/basic/ActionBasic04.jpg'
import BasicAction5 from '../images/cards/action/basic/en/ActionBasic05.jpg'
import BasicAction6 from '../images/cards/action/basic/en/ActionBasic06.jpg'
import BasicAction7 from '../images/cards/action/basic/ActionBasic07.jpg'
import BasicAction8 from '../images/cards/action/basic/en/ActionBasic08.jpg'
import BasicAction9 from '../images/cards/action/basic/en/ActionBasic09.jpg'
import BasicAction10 from '../images/cards/action/basic/en/ActionBasic10.jpg'
import BasicAction11 from '../images/cards/action/basic/en/ActionBasic11.jpg'
import BasicAction12 from '../images/cards/action/basic/en/ActionBasic12.jpg'
import BasicAction13 from '../images/cards/action/basic/en/ActionBasic13.jpg'
import BasicAction14 from '../images/cards/action/basic/en/ActionBasic14.jpg'
import BasicAction15 from '../images/cards/action/basic/ActionBasic15.jpg'
import BasicActionBack from '../images/cards/action/basic/ActionBasicBack.png'

export class BasicActionCardDescription extends CardDescription {
  width = 6.76
  height = 4.36

  backImage = BasicActionBack

  images = {
    [BasicActionCard.BasicAction1]: BasicAction1,
    [BasicActionCard.BasicAction2]: BasicAction2,
    [BasicActionCard.BasicAction3]: BasicAction3,
    [BasicActionCard.BasicAction4]: BasicAction4,
    [BasicActionCard.BasicAction5]: BasicAction5,
    [BasicActionCard.BasicAction6]: BasicAction6,
    [BasicActionCard.BasicAction7]: BasicAction7,
    [BasicActionCard.BasicAction8]: BasicAction8,
    [BasicActionCard.BasicAction9]: BasicAction9,
    [BasicActionCard.BasicAction10]: BasicAction10,
    [BasicActionCard.BasicAction11]: BasicAction11,
    [BasicActionCard.BasicAction12]: BasicAction12,
    [BasicActionCard.BasicAction13]: BasicAction13,
    [BasicActionCard.BasicAction14]: BasicAction14,
    [BasicActionCard.BasicAction15]: BasicAction15
  }
}

export const basicActionCardDescription = new BasicActionCardDescription()
