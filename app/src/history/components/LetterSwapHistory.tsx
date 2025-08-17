/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import Letter from '../../images/icons/Letter.png'
import { historyIcon } from './historyCss'

export function LetterSwapHistory({ context }: MaterialLogProps) {
  const player = usePlayerName(context.action.playerId)
  return <Trans defaults="history.letter.swap" values={{ player }} components={{ letter: <Picture css={historyIcon} src={Letter} /> }} />
}
