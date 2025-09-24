import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import Lawsuit from '../../images/icons/Lawsuit.png'
import { components } from './utils'

export function LawsuitMarkerHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.lawsuit-marker')}</h2>
      <p>
        <Trans i18nKey="help.lawsuit-marker.text" components={{ ...components, lawsuit: <Picture src={Lawsuit} /> }} />
      </p>
    </>
  )
}
