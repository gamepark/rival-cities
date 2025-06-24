/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export const LetterHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.letter`)}</h2>
      <p>
        <Trans defaults={`help.Letter.descr`} components={components} />
      </p>
      <ul>
        <li>{t(`help.Letter.use.1`)}</li>
        <li>{t(`help.Letter.use.2`)}</li>
        <li>{t(`help.Letter.use.3`)}</li>
      </ul>
    </>
  )
}
