/** @jsxImportSource @emotion/react */

import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const GetFactoryHistory = (props: MoveComponentProps) => {
  const { context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)

  return (
    <Trans defaults="history.get.factory" values={{ player: name }} />
  )
}
