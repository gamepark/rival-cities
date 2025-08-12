import { faHand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { BasicAction } from '@gamepark/rival-cities/material/BasicAction'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import BasicAction2 from '../images/cards/action/basic/ActionBasic02.jpg'
import BasicAction4 from '../images/cards/action/basic/ActionBasic04.jpg'
import BasicAction7 from '../images/cards/action/basic/ActionBasic07.jpg'
import BasicAction15 from '../images/cards/action/basic/ActionBasic15.jpg'
import BasicAction1 from '../images/cards/action/basic/en/ActionBasic01.jpg'
import BasicAction3 from '../images/cards/action/basic/en/ActionBasic03.jpg'
import BasicAction5 from '../images/cards/action/basic/en/ActionBasic05.jpg'
import BasicAction6 from '../images/cards/action/basic/en/ActionBasic06.jpg'
import BasicAction8 from '../images/cards/action/basic/en/ActionBasic08.jpg'
import BasicAction9 from '../images/cards/action/basic/en/ActionBasic09.jpg'
import BasicAction10 from '../images/cards/action/basic/en/ActionBasic10.jpg'
import BasicAction11 from '../images/cards/action/basic/en/ActionBasic11.jpg'
import BasicAction12 from '../images/cards/action/basic/en/ActionBasic12.jpg'
import BasicAction13 from '../images/cards/action/basic/en/ActionBasic13.jpg'
import BasicAction14 from '../images/cards/action/basic/en/ActionBasic14.jpg'
import { BasicActionCardHelp } from './help/BasicActionCardHelp'

export class BasicActionCardDescription extends CardDescription {
  width = 6.75
  height = 4.35

  menuAlwaysVisible = true

  images = {
    [BasicAction.BasicAction1]: BasicAction1,
    [BasicAction.BasicAction2]: BasicAction2,
    [BasicAction.BasicAction3]: BasicAction3,
    [BasicAction.BasicAction4]: BasicAction4,
    [BasicAction.BasicAction5]: BasicAction5,
    [BasicAction.BasicAction6]: BasicAction6,
    [BasicAction.BasicAction7]: BasicAction7,
    [BasicAction.BasicAction8]: BasicAction8,
    [BasicAction.BasicAction9]: BasicAction9,
    [BasicAction.BasicAction10]: BasicAction10,
    [BasicAction.BasicAction11]: BasicAction11,
    [BasicAction.BasicAction12]: BasicAction12,
    [BasicAction.BasicAction13]: BasicAction13,
    [BasicAction.BasicAction14]: BasicAction14,
    [BasicAction.BasicAction15]: BasicAction15
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const inkJarLocationId = context.rules.material(MaterialType.InkJar).getItem()!.location.id
    const play = item.location.id === inkJarLocationId && legalMoves.find((move) => isCustomMoveType(CustomMoveType.PlayInkJarCard)(move))

    if (item.location.type === LocationType.CardPiste && play) {
      return (
        <ItemMenuButton label={<Trans defaults="button.play" />} angle={50} radius={4} move={play}>
          <FontAwesomeIcon icon={faHand} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }

  help = BasicActionCardHelp
}

export const basicActionCardDescription = new BasicActionCardDescription()
