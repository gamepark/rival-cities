/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Letter from '../../images/icons/Letter.png'
import { historyIcon } from './historyCss'

export function PayLetterHistory({ move, context }: MaterialLogProps<MoveItem>) {
  const item = new RivalCitiesRules(context.game).material(MaterialType.Letter).getItem(move.itemIndex)
  const player = usePlayerName(item.location.player)
  return <Trans defaults="history.item.pay" values={{ player, count: move.quantity ?? 1 }} components={{ item: <Picture css={historyIcon} src={Letter} /> }} />
}
