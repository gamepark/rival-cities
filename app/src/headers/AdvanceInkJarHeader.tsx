/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'

export const AdvanceInkJarHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.advance.inkjar.you" />
  }

  return <Trans defaults="header.advance.inkjar.player" values={{ player: name }} />
}
