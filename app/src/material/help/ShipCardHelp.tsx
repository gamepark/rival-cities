/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { Product } from '@gamepark/rival-cities/material/Product'
import { Ship, shipData } from '@gamepark/rival-cities/material/Ship'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, note } from './utils'

export const ShipCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.ship.card')}</h2>
      <p>
        <Trans defaults="help.ship.card.descr" />
      </p>
      {item.id && (
        <>
          <p>
            <b>{t('help.price')}</b> <Price cardId={item.id as Ship} />
          </p>
          {item.id < 20 && (
            <>
              <h4>{t('help.ship.card.bonus')}</h4>
              <p>
                <Trans defaults={`help.ship.card.bonus.${item.id}`} />
              </p>
            </>
          )}
        </>
      )}
      <p css={note}>
        <Trans defaults={'help.ship.card.win'} components={components} />
      </p>
    </>
  )
}

const Price = ({ cardId }: { cardId: Ship }) => {
  const cost = shipData[cardId].cost
  if (!cost) return <></>
  const product = {
    [Product.Leather]: 'help.price.leather',
    [Product.Furniture]: 'help.price.furniture',
    [Product.Cloth]: 'help.price.cloth',
    [Product.Beer]: 'help.price.beer'
  }
  return <Trans defaults={product[cost.product]} values={{ quantity: cost.amount }} components={components} />
}
