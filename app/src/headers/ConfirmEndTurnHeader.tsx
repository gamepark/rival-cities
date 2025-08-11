/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ConfirmEndTurnHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const confirmEndTurn = useLegalMove(isCustomMoveType(CustomMoveType.ConfirmEndTurn))

  if (activePlayer === me) {
    return (
      <Trans
        defaults="header.confirm.end.turn.you"
        components={{
          confirm: <PlayMoveButton move={confirmEndTurn} auto={10} />
        }}
      />
    )
  }

  return <Trans defaults="header.confirm.end.turn.player" values={{ player }} />
}
