/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PurchaseShipHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  if (activePlayer === me) {
    return (
      <Trans
        defaults="header.ship.you"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults="header.ship.player" values={{ player }} />
}
