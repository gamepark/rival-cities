/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { isStartPlayerTurn } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ConfirmEndTurnHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const confirm = useLegalMove(isStartPlayerTurn)
  if (activePlayer === me) {
    return <Trans defaults="header.end-turn.you" components={{ confirm: <PlayMoveButton move={confirm} auto={10} /> }} />
  } else {
    return <Trans defaults="header.end-turn.player" values={{ player }} />
  }
}
