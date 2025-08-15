/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Ship, shipData, ShipEffect, ShipEffectType } from '@gamepark/rival-cities/material/Ship'
import { Trans, useTranslation } from 'react-i18next'
import { getProductIcon } from '../../headers/HeaderIconsCss'
import Beer from '../../images/icons/Beer.png'
import Star from '../../images/icons/Star.png'
import { ActionHelp } from './ActionsHelp'
import { CostDisplay } from './CostDisplay'
import { components, note } from './utils'

export function ShipCardHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.card.ship')}</h2>
      <p>
        <Trans defaults="help.card.ship.text" />
      </p>
      {item.id && <ShipHelp ship={item.id} />}
      <p css={note}>
        <Trans defaults={'help.card.ship.win'} components={components} />
      </p>
    </>
  )
}

function ShipHelp({ ship }: { ship: Ship }) {
  const { t } = useTranslation()
  const { cost, effect, getNbStars } = shipData[ship]
  return (
    <>
      <p>
        <strong>
          <Trans defaults="help.card.ship.cost" components={{ cost: <CostDisplay cost={cost} /> }} />
        </strong>
      </p>
      {effect && <ShipEffectHelp effect={effect} />}
      {ship === 16 && (
        <>
          <h4>{t('help.card.ship.effect.permanent')}</h4>
          <p>
            <Trans defaults="help.card.ship.16.effect" components={{ ...components, beer: <Picture src={Beer} /> }} />
          </p>
        </>
      )}
      {ship >= 17 && ship <= 19 && (
        <>
          <h4>{t('help.card.ship.effect.permanent')}</h4>
          <p>{t(`help.card.ship.${ship}.effect`)}</p>
        </>
      )}
      {ship === Ship.Ship21 ? (
        <p>
          <Trans defaults="help.card.ship.21.stars" components={{ star: <Picture src={Star} /> }} />
        </p>
      ) : (
        <p>
          <Trans defaults="help.card.stars" values={{ stars: getNbStars(0) }} components={{ star: <Picture src={Star} /> }} />
        </p>
      )}
    </>
  )
}

function ShipEffectHelp({ effect }: { effect: ShipEffect }) {
  const { t } = useTranslation()
  switch (effect.type) {
    case ShipEffectType.Instant:
      return (
        <>
          <h4>{t('help.card.ship.effect.instant')}</h4>
          {effect.actions.map((action, index) => (
            <ActionHelp key={index} action={action} />
          ))}
        </>
      )
    case ShipEffectType.ProductionBonus:
      return (
        <>
          <h4>{t('help.card.ship.effect.permanent')}</h4>
          <p>
            <Trans defaults="help.card.ship.effect.production" components={{ product: <Picture src={getProductIcon(effect.product)} /> }} />
          </p>
        </>
      )
    case ShipEffectType.Income:
      return (
        <>
          <h4>{t('help.card.ship.effect.income')}</h4>
          <ActionHelp action={effect.action} />
        </>
      )
    case ShipEffectType.WinLawsuitBonus:
      return (
        <>
          <h4>{t('help.card.ship.effect.permanent')}</h4>
          <p>
            <Trans defaults="help.card.ship.15.effect" components={{ star: <Picture src={Star} /> }} />
          </p>
        </>
      )
  }
}
