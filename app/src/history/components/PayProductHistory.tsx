/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Product } from '@gamepark/rival-cities/material/Product'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { getProductIcon } from '../../headers/HeaderIconsCss'
import { historyIcon } from './historyCss'

export function PayProductHistory({ move, context }: MaterialLogProps<MoveItem>) {
  const item = new RivalCitiesRules(context.game).material(MaterialType.Product).getItem(move.itemIndex)
  const player = usePlayerName(item.location.player)
  const product = move.location.id as Product
  return (
    <Trans
      defaults="history.item.pay"
      values={{ player, count: move.quantity ?? 1 }}
      components={{ item: <Picture css={historyIcon} src={getProductIcon(product)} /> }}
    />
  )
}
