/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { useTranslation } from 'react-i18next'

export const OffSeasonPayForAllianceHeader = () => {
  const { t } = useTranslation()
  const playerId: number | undefined = usePlayerId()
  const activePlayers = useRules<RivalCitiesRules>()?.game.rule?.players ?? []
  const player = usePlayerName(activePlayers[0])
  if (playerId !== undefined && activePlayers.includes(playerId)) {
    return <>{t('header.off.season.pay.alliance.you')}</>
  } else if (activePlayers.length === 1) {
    return <>{t('header.off.season.pay.alliance.player', { player })}</>
  } else {
    return <>{t('header.off.season.pay.alliance.others')}</>
  }
}
