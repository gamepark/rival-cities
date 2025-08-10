/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { Trans } from 'react-i18next'

export const PayInkJarMovementCostHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const player = usePlayerName(activePlayer)
  const count = rules.remind<number>(Memory.Count)

  if (activePlayer === me) {
    return <Trans defaults="header.pay.product.you" values={{ count }} />
  }

  return <Trans defaults="header.pay.product.player" values={{ player, count }} />
}
