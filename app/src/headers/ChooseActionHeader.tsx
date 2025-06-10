/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'

export const ChooseActionHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const playBasicAction = useLegalMove((move) => isCustomMoveType(CustomMoveType.PlaysBasicAction)(move))

  if (itsMe) {
    return (
      <Trans
        defaults="header.choose.action.you"
        components={{
          basic: <PlayMoveButton move={playBasicAction} />
        }}
      />
    )
  }

  return <Trans defaults="header.choose.action.player" values={{ player: name }} />
}
