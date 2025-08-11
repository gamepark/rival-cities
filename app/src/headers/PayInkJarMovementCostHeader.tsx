/** @jsxImportSource @emotion/react */

import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { Trans } from 'react-i18next'
import { getProductIcon, iconCss } from './HeaderIconsCss'

export const PayInkJarMovementCostHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const player = usePlayerName(activePlayer)
  const count = rules.remind<number>(Memory.Count)

  if (activePlayer === me) {
    return (
      <Trans
        defaults="header.ink-jar.cost.you"
        values={{ count }}
        components={{
          product: <Picture src={getProductIcon()} css={iconCss} />
        }}
      />
    )
  }

  return (
    <Trans
      defaults="header.ink-jar.cost.player"
      values={{ player, count }}
      components={{
        product: <Picture src={getProductIcon()} css={iconCss} />
      }}
    />
  )
}
