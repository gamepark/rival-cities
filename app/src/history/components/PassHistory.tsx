/** @jsxImportSource @emotion/react */
import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export function PassHistory({ context }: MaterialLogProps) {
  const player = usePlayerName(context.action.playerId)
  return <Trans defaults="history.pass" values={{ player }} />
}
