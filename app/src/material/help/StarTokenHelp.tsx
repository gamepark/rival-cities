/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export const StarTokenHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.star.token`)}</h2>
      <p>
        <Trans defaults={`help.star.token.descr`} components={components} />
      </p>
    </>
  )
}
