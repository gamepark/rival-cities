/** @jsxImportSource @emotion/react */

import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { MoveItem } from '@gamepark/rules-api'

export const GetLetterHistory = (props: MoveComponentProps<MoveItem>) => {
  const { move } = props
  const actionPlayer = move.location.player
  const name = usePlayerName(actionPlayer)

  return <Trans defaults="history.get.letter" values={{ player: name, quantity: move.quantity }} />
}
