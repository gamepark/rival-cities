import { faArrowRightArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LawsuitCard } from '@gamepark/rival-cities/material/LawsuitCard'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
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

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const resolveLawsuit = legalMoves.find((move) => isCustomMoveType(CustomMoveType.ResolveLawsuit)(move))
    const left = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.LawsuitCard)(move) &&
        move.location.type === LocationType.LawsuitCardsRiver &&
        move.location.z === 0 &&
        move.itemIndex === context.index
    )
    const right = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.LawsuitCard)(move) &&
        move.location.type === LocationType.LawsuitCardsRiver &&
        move.location.z === 2 &&
        move.itemIndex === context.index
    )

    if (left || right) {
      return (
        <>
          {left && (
            <ItemMenuButton label={<Trans defaults="button.exchange" />} labelPosition="left" angle={50} y={1} x={-4.5} move={left}>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} css={pointerCursorCss} />
            </ItemMenuButton>
          )}
          {right && (
            <ItemMenuButton label={<Trans defaults="button.exchange" />} labelPosition="right" angle={50} y={1} x={4.5} move={right}>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} css={pointerCursorCss} />
            </ItemMenuButton>
          )}
        </>
      )
    }

    if (resolveLawsuit && _item.location.z === 0) {
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
