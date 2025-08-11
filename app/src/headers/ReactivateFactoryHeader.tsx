/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { ReactivateFactoryRule } from '@gamepark/rival-cities/rules/actions/ReactivateFactoryRule'
import { Trans } from 'react-i18next'

export const ReactivateFactoryHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const count = new ReactivateFactoryRule(rules.game).action.count

  if (activePlayer === me) {
    return <Trans defaults="header.reactivate-factory.you" values={{ count }} />
  }

  return <Trans defaults="header.reactivate-factory.player" values={{ player, count }} />
}
