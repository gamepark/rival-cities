/** @jsxImportSource @emotion/react */

import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { GainStarsRule } from '@gamepark/rival-cities/rules/actions/GainStarsRule'
import { Trans } from 'react-i18next'
import Star from '../images/icons/Star.png'

export const GainStarsHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const count = new GainStarsRule(rules.game).action.stars

  if (activePlayer === me) {
    return (
      <Trans
        defaults="header.gain-stars.you"
        values={{ count }}
        components={{
          star: <Picture src={Star} />
        }}
      />
    )
  }

  return (
    <Trans
      defaults="header.gain-stars.player"
      values={{ player, count }}
      components={{
        star: <Picture src={Star} />
      }}
    />
  )
}
