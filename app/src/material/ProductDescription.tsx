import { css, Interpolation, Theme } from '@emotion/react'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ComponentSize, ItemContext, ItemMenuButton, pointerCursorCss, TokenDescription } from '@gamepark/react-game'
import { Action, ActionType, MultipleActions } from '@gamepark/rival-cities/material/Action'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Product } from '@gamepark/rival-cities/material/Product'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import Beer from '../images/tokens/products/Beer.png'
import Cloth from '../images/tokens/products/Cloth.png'
import Furniture from '../images/tokens/products/Furniture.png'
import Leather from '../images/tokens/products/Leather.png'

export class ProductDescription extends TokenDescription {
  borderRadius = 0.3
  images = {
    [Product.Beer]: Beer,
    [Product.Leather]: Leather,
    [Product.Cloth]: Cloth,
    [Product.Furniture]: Furniture
  }
  menuAlwaysVisible = true

  getSize(id: Product): ComponentSize {
    return productSize[id]
  }

  getFrontExtraCss(itemId: Product): Interpolation<Theme> {
    switch (itemId) {
      case Product.Beer:
        return css`
          clip-path: polygon(34% 0, 85% 0, 94% 40%, 94% 72%, 70% 100%, 19% 100%, 9% 77%, 9% 29%);
        `
      case Product.Leather:
        return css`
          clip-path: polygon(
            18% 9%,
            31% 9%,
            46% 0%,
            63% 0%,
            70% 9%,
            91% 9%,
            100% 19%,
            82% 44%,
            86% 65%,
            100% 75%,
            79% 97%,
            63% 91%,
            46% 100%,
            22% 89%,
            10% 96%,
            0% 85%,
            15% 63%,
            17% 47%,
            0% 28%
          );
        `
      case Product.Cloth:
        return css`
          clip-path: polygon(47% 0%, 68% 0%, 81% 17%, 81% 45%, 94% 45%, 100% 55%, 66% 100%, 19% 100%, 3% 85%, 0% 62%, 3% 53%);
        `
      case Product.Furniture:
        return css`
          clip-path: polygon(15% 0%, 100% 0%, 92% 19%, 92% 79%, 71% 100%, 16% 100%, 15% 93%, 7% 93%, 7% 36%, 0% 16%);
        `
    }
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.Product)(move) && move.itemIndex === context.index
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const returnToReserve = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.Product)(move) &&
        move.location.type === LocationType.ProductSupply &&
        move.itemIndex === context.index &&
        move.location.id === item.location.id
    )

    const take = legalMoves.find(
      (move) =>
        isMoveItemType(MaterialType.Product)(move) &&
        move.location.type === LocationType.PlayerProducts &&
        move.itemIndex === context.index &&
        move.location.id === item.location.id
    )

    if (context.displayIndex !== 0) return undefined

    if (take) {
      return (
        <ItemMenuButton label={<Trans defaults="button.take" />} labelPosition={'right'} angle={50} radius={4} y={-1} x={0} move={take}>
          <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }

    if (returnToReserve) {
      const label = this.checkIfIsExchange(context) ? 'button.exchange' : 'button.pay'
      return (
        <ItemMenuButton label={<Trans defaults={label} />} labelPosition={'right'} angle={50} radius={4} y={-1} x={0} move={returnToReserve}>
          <FontAwesomeIcon icon={faArrowUp} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }

  checkIfIsExchange(context: ItemContext): boolean {
    const pendingActions: Action[] | undefined = context.rules.remind(Memory.Actions) ?? []
    const currentAction = pendingActions[0] as MultipleActions
    const isSwapAction = currentAction?.actions?.some((action) => action.type === ActionType.SwapProduct)
    return context.rules.game.rule?.id === RuleId.SwapProduct || isSwapAction
  }
}

const productSize = {
  [Product.Beer]: { width: 1.48, height: 1.6 },
  [Product.Leather]: { width: 1.33, height: 1.6 },
  [Product.Cloth]: { width: 1.35, height: 1 },
  [Product.Furniture]: { width: 1.53, height: 1.6 }
}

export const productDescription = new ProductDescription()
