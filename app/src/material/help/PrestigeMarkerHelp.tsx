/** @jsxImportSource @emotion/react */
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
        <Trans defaults="help.prestige.text" components={{ ...components, prestige: <Picture src={Prestige} /> }} />
      </p>
      <p css={note}>
        <Trans defaults={'help.prestige.win'} components={components} />
      </p>
    </>
  )
}
