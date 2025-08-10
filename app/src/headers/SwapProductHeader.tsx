/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans } from 'react-i18next'

export const SwapProductHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (activePlayer === me) {
    return <Trans defaults="header.swap.you" />
  }

  return <Trans defaults="header.swap.player" values={{ player }} />
}
