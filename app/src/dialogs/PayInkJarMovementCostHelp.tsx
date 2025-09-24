import { useTranslation } from 'react-i18next'

export const PayInkJarMovementCostHelp = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('help.move.cost')}</h2>
      <p>{t('help.game.overview.2')}</p>
    </>
  )
}
