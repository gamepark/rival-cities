/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, note } from './utils'

export const AllianceCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.alliance.card`)}</h2>
      <p>
        <Trans
          defaults={`help.alliance.card.descr`}/>
      </p>
      <h3>{t(`help.alliance.card.${item.id}`)}</h3>
      <p>
        <Trans defaults={`help.alliance.card.${item.id}.price`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.alliance.card.${item.id}.descr`} components={components} />
      </p>
      <p css={note} >
        <Trans defaults={`help.alliance.card.win`} components={components}/>
      </p>
    </>
  )
} 