import { faArrowDown, faHand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { SpecialAction } from '@gamepark/rival-cities/material/SpecialAction'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import SpecialAction1 from '../images/cards/action/special/ActionSpecial01.jpg'
import SpecialAction4 from '../images/cards/action/special/ActionSpecial04.jpg'
import SpecialAction8 from '../images/cards/action/special/ActionSpecial08.jpg'
import SpecialAction14 from '../images/cards/action/special/ActionSpecial14.jpg'
import SpecialAction15 from '../images/cards/action/special/ActionSpecial15.jpg'
import SpecialAction18 from '../images/cards/action/special/ActionSpecial18.jpg'
import SpecialAction19 from '../images/cards/action/special/ActionSpecial19.jpg'
import SpecialAction21 from '../images/cards/action/special/ActionSpecial21.jpg'
import SpecialActionBack from '../images/cards/action/special/ActionSpecialBack.jpg'
import SpecialAction2 from '../images/cards/action/special/en/ActionSpecial02.jpg'
import SpecialAction3 from '../images/cards/action/special/en/ActionSpecial03.jpg'
import SpecialAction5 from '../images/cards/action/special/en/ActionSpecial05.jpg'
import SpecialAction6 from '../images/cards/action/special/en/ActionSpecial06.jpg'
import SpecialAction7 from '../images/cards/action/special/en/ActionSpecial07.jpg'
import SpecialAction9 from '../images/cards/action/special/en/ActionSpecial09.jpg'
import SpecialAction10 from '../images/cards/action/special/en/ActionSpecial10.jpg'
import SpecialAction11 from '../images/cards/action/special/en/ActionSpecial11.jpg'
import SpecialAction12 from '../images/cards/action/special/en/ActionSpecial12.jpg'
import SpecialAction13 from '../images/cards/action/special/en/ActionSpecial13.jpg'
import SpecialAction16 from '../images/cards/action/special/en/ActionSpecial16.jpg'
import SpecialAction17 from '../images/cards/action/special/en/ActionSpecial17.jpg'
import SpecialAction20 from '../images/cards/action/special/en/ActionSpecial20.jpg'
import SpecialAction22 from '../images/cards/action/special/en/ActionSpecial22.jpg'
import SpecialAction23 from '../images/cards/action/special/en/ActionSpecial23.jpg'
import SpecialAction24 from '../images/cards/action/special/en/ActionSpecial24.jpg'
import { SpecialActionCardHelp } from './help/SpecialActionCardHelp'

export class SpecialActionCardDescription extends CardDescription {
  width = 6.75
  height = 4.35

  backImage = SpecialActionBack

  menuAlwaysVisible = true

  images = {
    [SpecialAction.SpecialAction1]: SpecialAction1,
    [SpecialAction.SpecialAction2]: SpecialAction2,
    [SpecialAction.SpecialAction3]: SpecialAction3,
    [SpecialAction.SpecialAction4]: SpecialAction4,
    [SpecialAction.SpecialAction5]: SpecialAction5,
    [SpecialAction.SpecialAction6]: SpecialAction6,
    [SpecialAction.SpecialAction7]: SpecialAction7,
    [SpecialAction.SpecialAction8]: SpecialAction8,
    [SpecialAction.SpecialAction9]: SpecialAction9,
    [SpecialAction.SpecialAction10]: SpecialAction10,
    [SpecialAction.SpecialAction11]: SpecialAction11,
    [SpecialAction.SpecialAction12]: SpecialAction12,
    [SpecialAction.SpecialAction13]: SpecialAction13,
    [SpecialAction.SpecialAction14]: SpecialAction14,
    [SpecialAction.SpecialAction15]: SpecialAction15,
    [SpecialAction.SpecialAction16]: SpecialAction16,
    [SpecialAction.SpecialAction17]: SpecialAction17,
    [SpecialAction.SpecialAction18]: SpecialAction18,
    [SpecialAction.SpecialAction19]: SpecialAction19,
    [SpecialAction.SpecialAction20]: SpecialAction20,
    [SpecialAction.SpecialAction21]: SpecialAction21,
    [SpecialAction.SpecialAction22]: SpecialAction22,
    [SpecialAction.SpecialAction23]: SpecialAction23,
    [SpecialAction.SpecialAction24]: SpecialAction24
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    const locations = [LocationType.SpecialActionCardDiscard, LocationType.PlayerSpecialActionCardsHand]
    return isMoveItemType(MaterialType.SpecialActionCard)(move) && locations.includes(move.location.type ?? 0) && move.itemIndex === context.index
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const inkJarLocationId = context.rules.material(MaterialType.InkJar).getItem()!.location.id
    const play = item.location.id === inkJarLocationId && legalMoves.find((move) => isCustomMoveType(CustomMoveType.PlayInkJarCard)(move))
    const take = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.SpecialActionCard)(move) &&
        move.location.type === LocationType.PlayerSpecialActionCardsHand &&
        move.itemIndex === context.index
    )
    const draw = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.SpecialActionCard)(move) &&
        move.location.type === LocationType.PlayerSpecialActionCardsHand &&
        move.itemIndex === context.index
    )
    const discard = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.SpecialActionCardDiscard && move.itemIndex === context.index
    )

    if (item.location.type === LocationType.ActionCardSpace && (play || take)) {
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

    if (item.location.type === LocationType.ActionStack && draw) {
      return (
        <ItemMenuButton label={<Trans defaults="button.draw" />} move={draw}>
          <FontAwesomeIcon icon={faHand} css={pointerCursorCss} />
        </ItemMenuButton>
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
