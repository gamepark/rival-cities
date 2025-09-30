import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ComponentSize, ItemContext, ItemMenuButton, pointerCursorCss, TokenDescription } from '@gamepark/react-game'
import { Action, ActionType, MultipleActions, SwapProduct } from '@gamepark/rival-cities/material/Action'
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
import { ProductHelp } from './help/ProductHelp'

export class ProductDescription extends TokenDescription {
  borderRadius = 0.3
  images = {
    [Product.Beer]: Beer,
    [Product.Leather]: Leather,
    [Product.Cloth]: Cloth,
    [Product.Furniture]: Furniture
  }
  transparency = true
  menuAlwaysVisible = true

  getSize(id: Product): ComponentSize {
    return productSize[id]
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
        <ItemMenuButton label={<Trans i18nKey="button.take" />} labelPosition={'right'} angle={50} radius={4} y={-1} x={0} move={take}>
          <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }

    if (returnToReserve) {
      const label = this.checkIfIsExchange(context) ? 'button.exchange' : 'button.pay'
      return (
        <ItemMenuButton label={<Trans i18nKey={label} />} labelPosition={'right'} angle={50} radius={4} y={-1} x={0} move={returnToReserve}>
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
    return (
      context.rules.game.rule?.id === RuleId.SwapProduct ||
      isSwapAction ||
      context.rules.remind<SwapProduct | undefined>(Memory.PlayerProductSwap, context.player) !== undefined
    )
  }

  help = ProductHelp
}

const productSize = {
  [Product.Beer]: { width: 1.7, height: 1.7 },
  [Product.Leather]: { width: 1.7, height: 1.7 },
  [Product.Cloth]: { width: 1.7, height: 1.25 },
  [Product.Furniture]: { width: 1.7, height: 1.7 }
}

export const productDescription = new ProductDescription()
