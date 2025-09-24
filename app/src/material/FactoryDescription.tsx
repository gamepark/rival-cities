import { css, Interpolation, Theme } from '@emotion/react'
import { faArrowDown, faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import FactoryBack from '../images/tokens/FactoryBack.png'
import FactoryFront from '../images/tokens/FactoryFront.png'
import { FactoryHelp } from './help/FactoryHelp'

export class FactoryDescription extends CardDescription {
  width = 2.4
  height = 2.4
  image = FactoryFront
  backImage = FactoryBack
  transparent = true
  menuAlwaysVisible = true

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }

  getFrontExtraCss(): Interpolation<Theme> {
    return css`
      clip-path: polygon(44% 2%, 55% 2%, 98% 34%, 98% 98%, 2% 98%, 2% 34%);
    `
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.Factory)(move) && move.itemIndex === context.index
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const take = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.Factory)(move) &&
        move.location.type === LocationType.PlayerFactories &&
        !move.location.rotation &&
        move.itemIndex === context.index
    )
    const use = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.Factory)(move) &&
        move.location.type === LocationType.PlayerFactories &&
        move.location.rotation &&
        move.itemIndex === context.index
    )

    if (context.displayIndex !== 0) return undefined

    if (take) {
      return (
        <ItemMenuButton label={<Trans i18nKey="button.take" />} angle={50} radius={4} y={-1} x={1} move={take}>
          <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }

    if (use) {
      return (
        <ItemMenuButton angle={50} radius={4} y={-1} x={1} move={use}>
          <FontAwesomeIcon icon={faArrowLeftRotate} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }

  help = FactoryHelp
}

export const factoryDescription = new FactoryDescription()
