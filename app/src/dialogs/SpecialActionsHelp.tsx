/** @jsxImportSource @emotion/react */
import { useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { SpecialActionCard, specialActionCardActions } from '@gamepark/rival-cities/material/SpecialActionCard'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const SpecialActionsHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()

  const specialCardPlayed = rules
    ?.material(MaterialType.SpecialActionCard)
    .location(LocationType.SpecialActionCardsDiscard)
    .maxBy((it) => it.location.x!)
    .getItem()?.id

  if (!specialCardPlayed) return <></>

  const actions = specialActionCardActions[specialCardPlayed as SpecialActionCard]

  return (
    <>
      <h2>{t(`help.rule.actions`)}</h2>
      {actions.map((action, index) => (
        <p key={index}>
          <Trans defaults={`help.action.descr.${action}`} components={components} />
        </p>
      ))}
    </>
  )
}
