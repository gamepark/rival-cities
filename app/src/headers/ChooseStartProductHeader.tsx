/** @jsxImportSource @emotion/react */
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans } from 'react-i18next'
import { getProductIcon, iconCss } from './HeaderIconsCss'

export const ChooseStartProductHeader = () => {
  const me = usePlayerId()
  const activePlayer = useRules<RivalCitiesRules>()!.getActivePlayer()
  const player = usePlayerName(activePlayer)
  if (me === activePlayer) {
    return (
      <Trans
        defaults="header.start.you"
        components={{
          product: <Picture src={getProductIcon()} css={iconCss} />
        }}
      />
    )
  } else {
    return (
      <Trans
        defaults="header.start.player"
        values={{ player }}
        components={{
          product: <Picture src={getProductIcon()} css={iconCss} />
        }}
      />
    )
  }
}
