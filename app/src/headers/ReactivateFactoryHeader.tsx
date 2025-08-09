/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { ReactivateFactoryActionRule } from '@gamepark/rival-cities/rules/actions/ReactivateFactoryActionRule'
import { Trans } from 'react-i18next'

export const ReactivateFactoryHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = me && activePlayer === me
  const player = usePlayerName(activePlayer)
  const count = new ReactivateFactoryActionRule(rules.game).action.count

  if (itsMe) {
    return <Trans defaults="header.reactivate-factory.you" values={{ count }} />
  }

  return <Trans defaults="header.reactivate-factory.player" values={{ player, count }} />
}
