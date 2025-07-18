import { faHand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import OffSeasonOverview from '../images/overview/en/OffSeasonOverview.jpg'
import { OffSeasonOverviewHelp } from './help/OffSeasonOverviewHelp'

export class OffSeasonOverviewDescription extends CardDescription {
  width = 7.5
  height = 11.5

  menuAlwaysVisible = true

  staticItem = { location: { type: LocationType.CardPiste, id: 0 } }

  image = OffSeasonOverview

  getItemMenu(item: MaterialItem, _context: ItemContext, legalMoves: MaterialMove[]) {
    const play = legalMoves.find((move) => isCustomMoveType(CustomMoveType.PlaysInkjarCard)(move) && move.data === item.location.id)

    if (item.location.type === LocationType.CardPiste && play) {
      return (
        <ItemMenuButton label={<Trans defaults="button.play" />} angle={50} radius={4} y={3} move={play}>
          <FontAwesomeIcon icon={faHand} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }

  help = OffSeasonOverviewHelp
}

export const offSeasonOverviewDescription = new OffSeasonOverviewDescription()
