/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import InkJar from '../../images/tokens/InkJar.png'
import { historyIcon } from './historyCss'

export const MoveInkJarHistory = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(context.action.playerId)
  const origin = new RivalCitiesRules(context.game).material(MaterialType.InkJar).getItem()!.location.id as number
  const destination = move.location.id as number
  const distance = (20 + destination - origin) % 20
  return <Trans defaults="history.move-ink-jar" values={{ player, distance }} components={{ inkJar: <Picture css={historyIcon} src={InkJar} /> }} />
}
