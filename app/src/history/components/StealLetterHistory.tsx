import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { getRival } from '@gamepark/rival-cities/City'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Letter from '../../images/icons/Letter.png'
import { historyIcon } from './historyCss'

export function StealLetterHistory({ move }: MaterialLogProps<MoveItem>) {
  const player = usePlayerName(move.location.player)
  const rival = usePlayerName(getRival(move.location.player!))
  return (
    <Trans
      i18nKey="history.item.steal"
      values={{ player, rival, count: move.quantity ?? 1 }}
      components={{ item: <Picture css={historyIcon} src={Letter} /> }}
    />
  )
}
