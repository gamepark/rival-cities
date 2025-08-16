/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Letter from '../../images/icons/Letter.png'
import { historyIcon } from './historyCss'

export const GainLetterHistory = ({ move }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(move.location.player)
  return <Trans defaults="history.item.gain" values={{ player, count: move.quantity ?? 1 }} components={{ item: <Picture css={historyIcon} src={Letter} /> }} />
}
