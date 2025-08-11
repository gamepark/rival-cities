/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PayToPerformActionAgainHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  if (activePlayer === me) {
    return (
      <Trans
        defaults="header.pay.perform.again.you"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults="header.pay.perform.again.player" values={{ player }} />
}
