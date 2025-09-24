import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export function OffSeasonEndHistory({ context }: MaterialLogProps<MoveItem>) {
  const bell = new RivalCitiesRules(context.game).material(MaterialType.BellToken).getItem()!
  const player = usePlayerName(bell.location.player)
  return <Trans i18nKey="history.off-season.end" values={{ player }} />
}
