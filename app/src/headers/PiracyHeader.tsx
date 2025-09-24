import { HeaderText, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { getRival } from '@gamepark/rival-cities/City'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { PiracyRule } from '@gamepark/rival-cities/rules/actions/PiracyRule'
import { Trans } from 'react-i18next'

export const PiracyHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()!
  const player = usePlayerName(activePlayer)
  const target = usePlayerName(getRival(activePlayer))
  const count = new PiracyRule(rules.game).action.nbProductsToSteal
  if (me && activePlayer !== me) {
    return <Trans i18nKey="header.piracy.target" values={{ player, count }} />
  }
  return <HeaderText code="piracy" values={{ count, target }} />
}
