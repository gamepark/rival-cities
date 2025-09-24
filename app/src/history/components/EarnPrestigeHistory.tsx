import { MaterialLogProps, Picture, usePlayerName } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Prestige from '../../images/icons/Prestige.png'
import { historyIcon } from './historyCss'

export function EarnPrestigeHistory({ move, context }: MaterialLogProps<MoveItem>) {
  const origin = new RivalCitiesRules(context.game).material(MaterialType.PrestigeMarker).getItem()!.location.x!
  const player = usePlayerName(origin > move.location.x! ? City.Altona : City.Hamburg)
  return <Trans i18nKey="history.prestige.earn" values={{ player }} components={{ prestige: <Picture css={historyIcon} src={Prestige} /> }} />
}
