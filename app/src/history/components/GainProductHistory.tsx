/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { Product } from '@gamepark/rival-cities/material/Product'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { getProductIcon } from '../../headers/HeaderIconsCss'
import { historyIcon } from './historyCss'

export const GainProductHistory = ({ move }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(move.location.player)
  const product = move.location.id as Product
  return (
    <Trans
      defaults="history.item.gain"
      values={{ player, count: move.quantity ?? 1 }}
      components={{ item: <Picture css={historyIcon} src={getProductIcon(product)} /> }}
    />
  )
}
