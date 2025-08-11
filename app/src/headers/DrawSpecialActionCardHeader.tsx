/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans } from 'react-i18next'

export const DrawSpecialActionCardHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)

  if (activePlayer === me) {
    return <Trans defaults="header.draw.special.action.card.you" />
  }

  return <Trans defaults="header.draw.special.action.card.player" values={{ player }} />
}
