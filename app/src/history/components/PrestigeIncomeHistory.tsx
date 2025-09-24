import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { GainPrestigeIncomeRule } from '@gamepark/rival-cities/rules/OffSeason/GainPrestigeIncomeRule'
import { Trans } from 'react-i18next'

export function PrestigeIncomeHistory({ context }: MaterialLogProps) {
  const prestigeX = new GainPrestigeIncomeRule(context.game).material(MaterialType.PrestigeMarker).getItem()!.location.x!
  const player = usePlayerName(prestigeX < 0 ? City.Altona : City.Hamburg)
  return <Trans i18nKey="history.prestige.income" values={{ player }} />
}
