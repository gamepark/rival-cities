import { faArrowRightArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { Lawsuit } from '@gamepark/rival-cities/material/Lawsuit'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
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
import { LawsuitCardHelp } from './help/LawsuitCardHelp'

export class LawsuitCardDescription extends CardDescription {
  width = 6.75
  height = 4.35

  backImage = LawsuitBack

  menuAlwaysVisible = true

  images = {
    [Lawsuit.Lawsuit1]: Lawsuit1,
    [Lawsuit.Lawsuit2]: Lawsuit2,
    [Lawsuit.Lawsuit3]: Lawsuit3,
    [Lawsuit.Lawsuit4]: Lawsuit4,
    [Lawsuit.Lawsuit5]: Lawsuit5,
    [Lawsuit.Lawsuit6]: Lawsuit6,
    [Lawsuit.Lawsuit7]: Lawsuit7,
    [Lawsuit.Lawsuit8]: Lawsuit8,
    [Lawsuit.Lawsuit9]: Lawsuit9,
    [Lawsuit.Lawsuit10]: Lawsuit10
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const resolveLawsuit = legalMoves.find((move) => isCustomMoveType(CustomMoveType.ResolveLawsuit)(move))
    const firstLawsuit = context.rules.material(MaterialType.LawsuitPiece).location((l) => l.x === 0)
    const moveLeft = legalMoves.find((move) => isMoveItemType(MaterialType.LawsuitPiece)(move) && move.itemIndex === item.location.parent)
    if (moveLeft) {
      return (
        <ItemMenuButton label={<Trans defaults="button.exchange" />} labelPosition="right" angle={50} y={0} x={-4.8} move={moveLeft}>
          <FontAwesomeIcon icon={faArrowRightArrowLeft} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }

    if (resolveLawsuit && item.location.parent === firstLawsuit.getIndex()) {
      return (
        <ItemMenuButton label={<Trans defaults="button.resolve" />} labelPosition="left" angle={50} y={-2} x={2.5} move={resolveLawsuit}>
          <FontAwesomeIcon icon={faCheck} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }

  help = LawsuitCardHelp
}

export const lawsuitCardDescription = new LawsuitCardDescription()
