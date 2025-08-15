import { css } from '@emotion/react'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemContext, ItemMenuButton, pointerCursorCss, TokenDescription } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import PrestigeMarker from '../images/tokens/PrestigeMarker.png'
import { PrestigeMarkerHelp } from './help/PrestigeMarkerHelp'

export class PrestigeMarkerDescription extends TokenDescription {
  width = 2.3
  height = 2

  menuAlwaysVisible = true

  image = PrestigeMarker

  canShortClick(move: MaterialMove, context: ItemContext) {
    return isMoveItemType(MaterialType.PrestigeMarker)(move) && move.itemIndex === context.index
  }

  getFrontExtraCss() {
    return css`
      clip-path: polygon(23% 0%, 40% 0%, 53% 16%, 69% 1%, 85% 1%, 95% 10%, 100% 23%, 100% 40%, 46% 100%, 0% 48%, 0% 24%);
    `
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const advance = legalMoves.find(
      (move) => isMoveItemType(MaterialType.PrestigeMarker)(move) && move.location.type === LocationType.PrestigeTrack && move.itemIndex === context.index
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

  help = PrestigeMarkerHelp
}

export const prestigeMarkerDescription = new PrestigeMarkerDescription()
