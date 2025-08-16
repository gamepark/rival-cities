/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { getRival } from '@gamepark/rival-cities/City'
import { Product } from '@gamepark/rival-cities/material/Product'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { getProductIcon } from '../../headers/HeaderIconsCss'
import { historyIcon } from './historyCss'

export function StealProductHistory({ move }: MaterialLogProps<MoveItem>) {
  const player = usePlayerName(move.location.player)
  const rival = usePlayerName(getRival(move.location.player!))
  const product = move.location.id as Product
  return (
    <Trans
      defaults="history.item.steal"
      values={{ player, rival, count: move.quantity ?? 1 }}
      components={{ item: <Picture css={historyIcon} src={getProductIcon(product)} /> }}
    />
  )
}
