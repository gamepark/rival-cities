/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { useTranslation } from 'react-i18next'

export const PayAlliancesUpkeepHeader = () => {
  const { t } = useTranslation()
  const me = usePlayerId<City>()
  const activePlayers = useRules<RivalCitiesRules>()?.game.rule?.players ?? []
  const player = usePlayerName(activePlayers[0])
  if (me !== undefined && activePlayers.includes(me)) {
    return <>{t('header.pay-alliances.you')}</>
  } else if (activePlayers.length === 1) {
    return <>{t('header.pay-alliances.player', { player })}</>
  } else {
    return <>{t('header.pay-alliances.others')}</>
  }
}
