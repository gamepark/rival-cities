/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
import { Trans } from 'react-i18next'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'

export const PayProductForAdvanceHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const nbProducts = rules.game.memory[MemoryType.NbProductToPayForAdvance]

  if (itsMe) {
    return <Trans defaults="header.pay.product.you" values={{ nbProducts }} />
  }

  return <Trans defaults="header.pay.product.player" values={{ player: name, nbProducts }} />
}
