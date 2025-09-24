import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export function PassHistory({ context }: MaterialLogProps) {
  const player = usePlayerName(context.action.playerId)
  return <Trans i18nKey="history.pass" values={{ player }} />
}
