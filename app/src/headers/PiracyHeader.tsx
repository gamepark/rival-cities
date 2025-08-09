/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { getRival } from '@gamepark/rival-cities/City'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { PiracyActionRule } from '@gamepark/rival-cities/rules/actions/PiracyActionRule'
import { Trans } from 'react-i18next'

export const PiracyHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule!.player!
  const player = usePlayerName(activePlayer)
  const target = usePlayerName(getRival(activePlayer))
  const count = new PiracyActionRule(rules.game).action.nbProductsToSteal

  if (activePlayer === me) {
    return <Trans defaults="header.piracy.you" values={{ count, target }} />
  } else if (me === undefined) {
    return <Trans defaults="header.piracy.player" values={{ player, count, target }} />
  } else {
    return <Trans defaults="header.piracy.target" values={{ player, count }} />
  }
}
