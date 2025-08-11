/** @jsxImportSource @emotion/react */

import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const GetStarTokenHistory = (props: MoveComponentProps<MoveItem>) => {
  const { move } = props
  const actionPlayer = move.location.player
  const player = usePlayerName(actionPlayer)

  return <Trans defaults="history.get.star" values={{ player }} />
}
