import { faArrowDown, faHand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { SpecialActionCard } from '@gamepark/rival-cities/material/SpecialActionCard'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { Trans } from 'react-i18next'
import SpecialAction1 from '../images/cards/action/special/ActionSpecial01.jpg'
import SpecialAction2 from '../images/cards/action/special/en/ActionSpecial02.jpg'
import SpecialAction3 from '../images/cards/action/special/en/ActionSpecial03.jpg'
import SpecialAction4 from '../images/cards/action/special/ActionSpecial04.jpg'
import SpecialAction5 from '../images/cards/action/special/en/ActionSpecial05.jpg'
import SpecialAction6 from '../images/cards/action/special/en/ActionSpecial06.jpg'
import SpecialAction7 from '../images/cards/action/special/en/ActionSpecial07.jpg'
import SpecialAction8 from '../images/cards/action/special/ActionSpecial08.jpg'
import SpecialAction9 from '../images/cards/action/special/en/ActionSpecial09.jpg'
import SpecialAction10 from '../images/cards/action/special/en/ActionSpecial10.jpg'
import SpecialAction11 from '../images/cards/action/special/en/ActionSpecial11.jpg'
import SpecialAction12 from '../images/cards/action/special/en/ActionSpecial12.jpg'
import SpecialAction13 from '../images/cards/action/special/en/ActionSpecial13.jpg'
import SpecialAction14 from '../images/cards/action/special/ActionSpecial14.jpg'
import SpecialAction15 from '../images/cards/action/special/ActionSpecial15.jpg'
import SpecialAction16 from '../images/cards/action/special/en/ActionSpecial16.jpg'
import SpecialAction17 from '../images/cards/action/special/en/ActionSpecial17.jpg'
import SpecialAction18 from '../images/cards/action/special/ActionSpecial18.jpg'
import SpecialAction19 from '../images/cards/action/special/ActionSpecial19.jpg'
import SpecialAction20 from '../images/cards/action/special/en/ActionSpecial20.jpg'
import SpecialAction21 from '../images/cards/action/special/ActionSpecial21.jpg'
import SpecialAction22 from '../images/cards/action/special/en/ActionSpecial22.jpg'
import SpecialAction23 from '../images/cards/action/special/en/ActionSpecial23.jpg'
import SpecialAction24 from '../images/cards/action/special/en/ActionSpecial24.jpg'
import SpecialActionBack from '../images/cards/action/special/ActionSpecialBack.png'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { SpecialActionCardHelp } from './help/SpecialActionCardHelp'

export class SpecialActionCardDescription extends CardDescription {
  width = 6.75
  height = 4.35

  backImage = SpecialActionBack

  menuAlwaysVisible = true

  images = {
    [SpecialActionCard.SpecialAction1]: SpecialAction1,
    [SpecialActionCard.SpecialAction2]: SpecialAction2,
    [SpecialActionCard.SpecialAction3]: SpecialAction3,
    [SpecialActionCard.SpecialAction4]: SpecialAction4,
    [SpecialActionCard.SpecialAction5]: SpecialAction5,
    [SpecialActionCard.SpecialAction6]: SpecialAction6,
    [SpecialActionCard.SpecialAction7]: SpecialAction7,
    [SpecialActionCard.SpecialAction8]: SpecialAction8,
    [SpecialActionCard.SpecialAction9]: SpecialAction9,
    [SpecialActionCard.SpecialAction10]: SpecialAction10,
    [SpecialActionCard.SpecialAction11]: SpecialAction11,
    [SpecialActionCard.SpecialAction12]: SpecialAction12,
    [SpecialActionCard.SpecialAction13]: SpecialAction13,
    [SpecialActionCard.SpecialAction14]: SpecialAction14,
    [SpecialActionCard.SpecialAction15]: SpecialAction15,
    [SpecialActionCard.SpecialAction16]: SpecialAction16,
    [SpecialActionCard.SpecialAction17]: SpecialAction17,
    [SpecialActionCard.SpecialAction18]: SpecialAction18,
    [SpecialActionCard.SpecialAction19]: SpecialAction19,
    [SpecialActionCard.SpecialAction20]: SpecialAction20,
    [SpecialActionCard.SpecialAction21]: SpecialAction21,
    [SpecialActionCard.SpecialAction22]: SpecialAction22,
    [SpecialActionCard.SpecialAction23]: SpecialAction23,
    [SpecialActionCard.SpecialAction24]: SpecialAction24
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    const locations = [LocationType.SpecialActionCardsDiscard, LocationType.PlayerSpecialActionCardsHand]
    return isMoveItemType(MaterialType.SpecialActionCard)(move) && locations.includes(move.location.type ?? 0) && move.itemIndex === context.index
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const play = legalMoves.find((move) => isCustomMoveType(CustomMoveType.PlaysInkjarCard)(move) && move.data === item.location.id)
    const take = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.SpecialActionCard)(move) &&
        move.location.type === LocationType.PlayerSpecialActionCardsHand &&
        move.itemIndex === context.index
    )
    const discard = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.SpecialActionCard)(move) &&
        move.location.type === LocationType.SpecialActionCardsDiscard &&
        move.itemIndex === context.index
    )

    if (item.location.type === LocationType.CardPiste && (play || take)) {
      return (
        <>
          {play && (
            <ItemMenuButton label={<Trans defaults="button.play" />} angle={50} radius={4} move={play}>
              <FontAwesomeIcon icon={faHand} css={pointerCursorCss} />
            </ItemMenuButton>
          )}
          {take && (
            <ItemMenuButton label={<Trans defaults="button.take" />} angle={50} radius={4} y={play ? -0.5 : undefined} move={take}>
              <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
            </ItemMenuButton>
          )}
        </>
      )
    }

    if (item.location.type === LocationType.PlayerSpecialActionCardsHand && discard) {
      return (
        <ItemMenuButton label={<Trans defaults="button.play" />} angle={50} radius={4} move={discard}>
          <FontAwesomeIcon icon={faHand} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }

  help = SpecialActionCardHelp
}

export const specialActionCardDescription = new SpecialActionCardDescription()
