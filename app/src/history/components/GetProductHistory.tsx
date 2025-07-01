/** @jsxImportSource @emotion/react */

import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const GetProductHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)

  return (
    <Trans defaults="history.get.product" values={{ player: name, product: move.id }} />
  )
}
