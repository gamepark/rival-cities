/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function BellTokenHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.bell.token')}</h2>
      <p>
        <Trans defaults="help.bell.token.descr" components={components} />
      </p>
    </>
  )
}
