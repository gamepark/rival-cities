/** @jsxImportSource @emotion/react */

import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PayProductHistory = (props: MoveComponentProps<MoveItem>) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const player = usePlayerName(actionPlayer)

  return <Trans defaults="history.pay.product" values={{ player, product: move.location.id, quantity: move.quantity ?? 1 }} />
}
