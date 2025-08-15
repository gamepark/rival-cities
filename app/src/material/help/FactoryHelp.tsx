/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function FactoryHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.factory')}</h2>
      <p>
        <Trans defaults="help.factory.descr" components={components} />
      </p>
    </>
  )
}
