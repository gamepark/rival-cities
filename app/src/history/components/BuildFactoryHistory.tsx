/** @jsxImportSource @emotion/react */
import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export function BuildFactoryHistory({ move }: MaterialLogProps<MoveItem>) {
  const player = usePlayerName(move.location.player)
  return <Trans defaults="history.factory.build" values={{ player }} />
}
