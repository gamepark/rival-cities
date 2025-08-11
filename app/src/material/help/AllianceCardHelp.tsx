/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, note } from './utils'

export const AllianceCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.alliance.card')}</h2>
      <p>
        <Trans defaults="help.alliance.card.descr" />
      </p>
      <h3>{t(`help.alliance.card.${item.id}`)}</h3>
      <p>
        <b>{t('help.price')}</b> <Price cardId={item.id as Alliance} />
      </p>
      <p>
        <Trans defaults={`help.alliance.card.${item.id}.descr`} components={components} />
      </p>
      <p css={note}>
        <Trans defaults="help.alliance.card.win" components={components} />
      </p>
    </>
  )
}

const Price = ({ cardId }: { cardId: Alliance }) => {
  switch (cardId) {
    case Alliance.Amsterdam:
      return <Trans defaults="help.price.choice" values={{ quantity: 2 }} components={components} />
    case Alliance.Bruxelles:
      return <Trans defaults="help.price.furniture" values={{ quantity: 1 }} components={components} />
    case Alliance.Gdansk:
      return <Trans defaults="help.price.letter" values={{ quantity: 1 }} components={components} />
    case Alliance.Kjjobenhavn:
      return <Trans defaults="help.price.beer" values={{ quantity: 2 }} components={components} />
    case Alliance.LeHavre:
    case Alliance.London:
    case Alliance.Novgorod:
    case Alliance.Oslo:
      return <Trans defaults="help.price.choice" values={{ quantity: 1 }} components={components} />
    default:
      return <></>
  }
}
