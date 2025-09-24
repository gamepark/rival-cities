import { useTranslation } from 'react-i18next'
import { TurnOverviewHelp } from './GameOverviewHelp'

export function InkJarHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.ink')}</h2>
      <TurnOverviewHelp />
    </>
  )
}
