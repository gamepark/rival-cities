import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemContext, ItemMenuButton, pointerCursorCss, TokenDescription } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import LawsuitMarker from '../images/tokens/LawsuitMarker.png'

export class LawsuitMarkerDescription extends TokenDescription {
  width = 0.8
  height = 0.8

  menuAlwaysVisible = true

  image = LawsuitMarker

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.LawsuitMarker)(move) && context.index === move.itemIndex
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const advance = legalMoves.find(
      (move) => isMoveItemType(MaterialType.LawsuitMarker)(move) && move.location.type === LocationType.LawsuitMarkerSpace && move.itemIndex === context.index
    )

    if (context.displayIndex !== 0) return undefined

    if (advance) {
      const icon = context.rules.game.rule?.player === City.Altona ? faArrowLeft : faArrowRight
      return (
        <ItemMenuButton label={<Trans defaults="button.advance" />} angle={50} radius={4} y={1.5} x={0} move={advance}>
          <FontAwesomeIcon icon={icon} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }
}

export const lawsuitMarkerDescription = new LawsuitMarkerDescription()
