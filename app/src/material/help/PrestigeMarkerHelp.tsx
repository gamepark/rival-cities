import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import Prestige from '../../images/icons/Prestige.png'
import { components, note } from './utils'

export function PrestigeMarkerHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.prestige')}</h2>
      <p>
        <Trans i18nKey="help.prestige.text" components={{ ...components, prestige: <Picture src={Prestige} /> }} />
      </p>
      <p css={note}>
        <Trans i18nKey={'help.prestige.win'} components={components} />
      </p>
    </>
  )
}
