/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Star from '../../images/icons/Star.png'
import { historyIcon } from './historyCss'

export function GainStarTokenHistory({ move }: MaterialLogProps<MoveItem>) {
  const player = usePlayerName(move.location.player)
  const count = move.quantity ?? 1
  return <Trans defaults="history.star.gain" values={{ player, count }} components={{ star: <Picture css={historyIcon} src={Star} /> }} />
}
