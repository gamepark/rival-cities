/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function StarTokenHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.star.token')}</h2>
      <p>
        <Trans defaults="help.star.token.descr" components={components} />
      </p>
    </>
  )
}
