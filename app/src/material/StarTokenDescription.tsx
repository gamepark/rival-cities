import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import StarToken from '../images/tokens/Star.jpg'
import { StarTokenHelp } from './help/StarTokenHelp'

export class StarTokenDescription extends CardDescription {
  width = 1.7
  height = 1.7
  borderRadius = 0.9

  menuAlwaysVisible = true

  image = StarToken

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.StarToken)(move) && move.itemIndex === context.index
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const take = legalMoves.find(
      (move) => isMoveItemType(MaterialType.Letter)(move) && move.location.type === LocationType.PlayerLetterDeck && move.itemIndex === context.index
    )

    if (context.displayIndex !== 0) return <></>

    if (take) {
      return (
        <ItemMenuButton label={<Trans defaults="button.take" />} labelPosition={'right'} angle={50} radius={4} y={-1} x={1} move={take}>
          <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return <></>
  }

  help = StarTokenHelp
}

export const starTokenDescription = new StarTokenDescription()
