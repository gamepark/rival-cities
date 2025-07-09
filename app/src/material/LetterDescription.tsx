import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import LetterFront from '../images/tokens/LetterFront.jpg'
import LetterBack from '../images/tokens/LetterBack.jpg'
import { LetterHelp } from './help/LetterHelp'

export class LetterDescription extends CardDescription {
  width = 3
  height = 1.9

  backImage = LetterBack

  menuAlwaysVisible = true

  image = LetterFront

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.Letter)(move) && context.index === move.itemIndex
  }

  help = LetterHelp

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const take = legalMoves.find(
      (move) => isMoveItemType(MaterialType.Letter)(move) && move.location.type === LocationType.PlayerLetterDeck && move.itemIndex === context.index
    )

    if (context.displayIndex !== 0) return <></>

    if (take) {
      return (
        <ItemMenuButton label={<Trans defaults="button.take" />} angle={50} radius={4} y={0} x={1} move={take}>
          <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return <></>
  }
}

export const letterDescription = new LetterDescription()
