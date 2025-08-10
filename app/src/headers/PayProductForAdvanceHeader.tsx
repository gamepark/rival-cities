/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { Trans } from 'react-i18next'

export const PayProductForAdvanceHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const count = rules.remind<number>(Memory.Count)

  if (itsMe) {
    return <Trans defaults="header.pay.product.you" values={{ count }} />
  }

  return <Trans defaults="header.pay.product.player" values={{ player: name, count }} />
}
