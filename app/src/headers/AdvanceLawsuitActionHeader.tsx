/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const AdvanceLawsuitActionHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))

  if (itsMe) {
    return (
      <Trans
        defaults={`header.advance.lawsuit.you`}
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults={`header.advance.lawsuit.player`} values={{ player: name }} />
}
