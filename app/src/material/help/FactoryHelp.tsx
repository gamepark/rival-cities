/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export const FactoryHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.factory`)}</h2>
      <p>
        <Trans
          defaults={`help.factory.descr`} components={components} />
      </p>
    </>
  )
}