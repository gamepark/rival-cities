/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { useTranslation } from 'react-i18next'

export const ChooseFirstProductHeader = () => {
  const { t } = useTranslation()
  const playerId: number | undefined = usePlayerId()
  const activePlayers = useRules<RivalCitiesRules>()?.game.rule?.players ?? []
  const player = usePlayerName(activePlayers[0])
  if (playerId !== undefined && activePlayers.includes(playerId)) {
    return <>{t('header.choose.first.product.you')}</>
  } else if (activePlayers.length === 1) {
    return <>{t('header.choose.first.product.player', { player })}</>
  } else {
    return <>{t('header.choose.first.product.others')}</>
  }
}
