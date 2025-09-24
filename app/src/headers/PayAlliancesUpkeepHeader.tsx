import { HeaderText, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isEndPlayerTurn } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PayAlliancesUpkeepHeader = () => {
  const endMyTurn = useLegalMove(isEndPlayerTurn)
  if (endMyTurn) {
    return <Trans i18nKey="header.end-turn.you" components={{ confirm: <PlayMoveButton move={endMyTurn} auto={5} /> }} />
  }
  return <HeaderText code="pay-alliances" />
}
