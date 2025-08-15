/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { components, note } from './utils'

export function BellTokenHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.bell')}</h2>
      <p>
        <Trans defaults="help.bell.text" components={components} />
      </p>
      <p css={note}>
        <Trans defaults={'help.bell.tie-breaker'} components={components} />
      </p>
    </>
  )
}
