/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { SpecialAction, specialCardActions } from '@gamepark/rival-cities/material/SpecialAction'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Location } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { ActionsHelp } from './ActionsHelp'

export function SpecialActionCardHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('help.card.special')}</h2>
      {item.location && <SpecialActionCardLocationHelp location={item.location} />}
      {item.id !== undefined && <ActionsHelp actions={specialCardActions[item.id as SpecialAction]} />}
    </>
  )
}

function SpecialActionCardLocationHelp({ location }: { location: Location }) {
  const { t } = useTranslation()
  switch (location?.type) {
    case LocationType.ActionCardSpace:
      return (
        <>
          <p>{t('help.card.special.text')}</p>
          <ol>
            <li>{t('help.action.choice.1')}</li>
            <li>{t('help.action.choice.2')}</li>
            <li>
              <Trans defaults={'help.action.choice.3'} components={{ bold: <strong /> }} />
            </li>
            <li>{t('help.action.choice.4')}</li>
          </ol>
        </>
      )
    case LocationType.ActionStack:
      return <SpecialActionCardStackHelp location={location} stack="stack" />
    case LocationType.SpecialActionCardDiscard:
      return <SpecialActionCardStackHelp location={location} stack="discard" />
    case LocationType.PlayerHand:
      return <SpecialActionCardPlayerHandHelp location={location} />
  }
  return null
}

function SpecialActionCardStackHelp({ location, stack }: { location: Location; stack: string }) {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()!
  return (
    <>
      <p>{t(`help.card.special.${stack}`, { count: rules.material(MaterialType.SpecialActionCard).location(location.type).length })}</p>
      <p>{t('help.card.special.shuffle')}</p>
    </>
  )
}

function SpecialActionCardPlayerHandHelp({ location }: { location: Location }) {
  const { t } = useTranslation()
  const me = usePlayerId()
  const player = usePlayerName(location.player)
  return (
    <>
      <p>{t(`help.card.special.hand.${me === location.player ? 'you' : 'player'}`, { player })}</p>
    </>
  )
}
