import { faArrowDown, faHand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import LetterBack from '../images/tokens/LetterBack.jpg'
import LetterFront from '../images/tokens/LetterFront.jpg'
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
    return isMoveItemType(MaterialType.Letter)(move) && context.index === move.itemIndex && move.location.type === LocationType.PlayerLetters
  }

  help = LetterHelp

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const take = legalMoves.find(
      (move) => isMoveItemType(MaterialType.Letter)(move) && move.location.type === LocationType.PlayerLetters && move.itemIndex === context.index
    )
    const useLetter = legalMoves.find(
      (move) => isMoveItemType(MaterialType.Letter)(move) && move.location.type === LocationType.LetterSupply && move.itemIndex === context.index
    )

    if (useLetter) {
      const nbLetters = context.rules.material(MaterialType.Letter).location(LocationType.PlayerLetters).player(context.player).getQuantity()
      if (context.displayIndex !== nbLetters - 1) return undefined
      return (
        <ItemMenuButton label={<Trans i18nKey="button.useLetter" />} labelPosition="right" angle={50} radius={4} y={-1} x={1} move={useLetter}>
          <FontAwesomeIcon icon={faHand} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }

    if (take) {
      if (context.displayIndex !== 0) return undefined
      return (
        <ItemMenuButton label={<Trans i18nKey="button.take" />} angle={50} radius={4} y={0} x={1} move={take}>
          <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }
}

export const letterDescription = new LetterDescription()
