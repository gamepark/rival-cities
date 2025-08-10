import { BasicAction } from '@gamepark/rival-cities/material/BasicAction'
import FrenchBasicAction2 from '../../../images/cards/action/basic/ActionBasic02.jpg'
import FrenchBasicAction4 from '../../../images/cards/action/basic/ActionBasic04.jpg'
import FrenchBasicAction7 from '../../../images/cards/action/basic/ActionBasic07.jpg'
import FrenchBasicAction15 from '../../../images/cards/action/basic/ActionBasic15.jpg'
import FrenchBasicAction1 from '../../../images/cards/action/basic/fr/ActionBasic01.jpg'
import FrenchBasicAction3 from '../../../images/cards/action/basic/fr/ActionBasic03.jpg'
import FrenchBasicAction5 from '../../../images/cards/action/basic/fr/ActionBasic05.jpg'
import FrenchBasicAction6 from '../../../images/cards/action/basic/fr/ActionBasic06.jpg'
import FrenchBasicAction8 from '../../../images/cards/action/basic/fr/ActionBasic08.jpg'
import FrenchBasicAction9 from '../../../images/cards/action/basic/fr/ActionBasic09.jpg'
import FrenchBasicAction10 from '../../../images/cards/action/basic/fr/ActionBasic10.jpg'
import FrenchBasicAction11 from '../../../images/cards/action/basic/fr/ActionBasic11.jpg'
import FrenchBasicAction12 from '../../../images/cards/action/basic/fr/ActionBasic12.jpg'
import FrenchBasicAction13 from '../../../images/cards/action/basic/fr/ActionBasic13.jpg'
import FrenchBasicAction14 from '../../../images/cards/action/basic/fr/ActionBasic14.jpg'
import { BasicActionCardDescription } from '../../BasicActionCardDescription'

class FrenchBasicActionCardDescription extends BasicActionCardDescription {
  images = {
    [BasicAction.BasicAction1]: FrenchBasicAction1,
    [BasicAction.BasicAction2]: FrenchBasicAction2,
    [BasicAction.BasicAction3]: FrenchBasicAction3,
    [BasicAction.BasicAction4]: FrenchBasicAction4,
    [BasicAction.BasicAction5]: FrenchBasicAction5,
    [BasicAction.BasicAction6]: FrenchBasicAction6,
    [BasicAction.BasicAction7]: FrenchBasicAction7,
    [BasicAction.BasicAction8]: FrenchBasicAction8,
    [BasicAction.BasicAction9]: FrenchBasicAction9,
    [BasicAction.BasicAction10]: FrenchBasicAction10,
    [BasicAction.BasicAction11]: FrenchBasicAction11,
    [BasicAction.BasicAction12]: FrenchBasicAction12,
    [BasicAction.BasicAction13]: FrenchBasicAction13,
    [BasicAction.BasicAction14]: FrenchBasicAction14,
    [BasicAction.BasicAction15]: FrenchBasicAction15
  }
}

export const frenchBasicActionCardDescription = new FrenchBasicActionCardDescription()
