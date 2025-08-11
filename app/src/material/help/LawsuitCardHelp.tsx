/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { Lawsuit } from '@gamepark/rival-cities/material/Lawsuit'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, note } from './utils'

export const LawsuitCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.lawsuit.card')}</h2>
      <p>
        <Trans defaults="help.lawsuit.card.descr.1" />
      </p>
      <p>
        <Trans defaults="help.lawsuit.card.descr.2" />
      </p>
      {item.id && (
        <>
          <p>
            <b>{t('help.lawsuit.price')}</b> <Price cardId={item.id as Lawsuit} />
          </p>
          <h4>{t('help.lawsuit.action.advance')}</h4>
          <ActionsOnAdvance cardId={item.id as Lawsuit} />
          <h4>{t('help.lawsuit.action.win')}</h4>
          <ActionsOnWin cardId={item.id as Lawsuit} />
        </>
      )}
      <p css={note}>
        <Trans defaults="help.lawsuit.card.win" components={components} />
      </p>
    </>
  )
}

const Price = ({ cardId }: { cardId: Lawsuit }) => {
  switch (cardId) {
    case Lawsuit.Lawsuit1:
      return <Trans defaults="help.price.cloth" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit2:
      return <Trans defaults="help.price.leather" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit3:
      return <Trans defaults="help.price.furniture" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit4:
      return <Trans defaults="help.price.letter" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit5:
      return <Trans defaults="help.price.leather" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit6:
      return <Trans defaults="help.price.furniture" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit7:
      return <Trans defaults="help.price.cloth" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit8:
      return <Trans defaults="help.price.cloth.leather" components={components} />
    case Lawsuit.Lawsuit9:
      return <Trans defaults="help.price.leather" values={{ quantity: 1 }} components={components} />
    case Lawsuit.Lawsuit10:
      return <Trans defaults="help.price.beer" values={{ quantity: 2 }} components={components} />
    default:
      return <></>
  }
}

const ActionsOnAdvance = ({ cardId }: { cardId: Lawsuit }) => {
  switch (cardId) {
    case Lawsuit.Lawsuit1:
      return (
        <p>
          <Trans defaults="help.gain.leather" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit2:
      return (
        <p>
          <Trans defaults="help.gain.furniture" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit3:
      return (
        <p>
          <Trans defaults="help.gain.cloth" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit4:
      return (
        <p>
          <Trans defaults="help.gain.prestige" components={components} />
        </p>
      )
    case Lawsuit.Lawsuit5:
      return (
        <p>
          <Trans defaults="help.gain.return.factories" values={{ quantity: 2 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit6:
      return (
        <p>
          <Trans defaults="help.gain.prestige" components={components} />
        </p>
      )
    case Lawsuit.Lawsuit7:
      return (
        <p>
          <Trans defaults="help.gain.beer" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit8:
      return (
        <>
          <p>
            <Trans defaults="help.gain.beer" values={{ quantity: 1 }} components={components} />
          </p>
          <p>
            <Trans defaults="help.gain.letter" values={{ quantity: 1 }} components={components} />
          </p>
        </>
      )
    case Lawsuit.Lawsuit9:
      return (
        <p>
          <Trans defaults="help.gain.prestige" components={components} />
        </p>
      )
    case Lawsuit.Lawsuit10:
      return (
        <p>
          <Trans defaults="help.gain.cloth" values={{ quantity: 1 }} components={components} />
        </p>
      )
    default:
      return <></>
  }
}

const ActionsOnWin = ({ cardId }: { cardId: Lawsuit }) => {
  switch (cardId) {
    case Lawsuit.Lawsuit1:
      return (
        <>
          <p>
            <Trans defaults="help.gain.leather" values={{ quantity: 3 }} components={components} />
          </p>
          <p>
            <Trans defaults="help.gain.prestige" components={components} />
          </p>
        </>
      )
    case Lawsuit.Lawsuit2:
      return (
        <p>
          <Trans defaults="help.gain.factory" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit3:
      return (
        <p>
          <Trans defaults="help.gain.choose.product" values={{ quantity: 2 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit4:
      return (
        <p>
          <Trans defaults="help.gain.factory" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit5:
      return (
        <>
          <p>
            <Trans defaults="help.gain.beer" values={{ quantity: 3 }} components={components} />
          </p>
          <p>
            <Trans defaults="help.gain.star" values={{ quantity: 2 }} components={components} />
          </p>
        </>
      )
    case Lawsuit.Lawsuit6:
      return (
        <p>
          <Trans defaults="help.gain.letter" values={{ quantity: 2 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit7:
      return (
        <>
          <p>
            <Trans defaults="help.gain.prestige" components={components} />
          </p>
          <p>
            <Trans defaults="help.gain.choose.product" values={{ quantity: 1 }} components={components} />
          </p>
        </>
      )
    case Lawsuit.Lawsuit8:
      return (
        <p>
          <Trans defaults="help.gain.factory" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit9:
      return (
        <p>
          <Trans defaults="help.gain.letter" values={{ quantity: 1 }} components={components} />
        </p>
      )
    case Lawsuit.Lawsuit10:
      return (
        <p>
          <Trans defaults="help.gain.factory" values={{ quantity: 1 }} components={components} />
        </p>
      )
    default:
      return <></>
  }
}
