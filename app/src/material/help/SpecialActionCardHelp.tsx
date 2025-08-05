/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { SpecialActionCardHelper } from '@gamepark/rival-cities/material/helper/SpecialActionCardHelper'
import { ShipCard } from '@gamepark/rival-cities/material/ShipCard'
import { SpecialActionCard } from '@gamepark/rival-cities/material/SpecialActionCard'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, note, shipBtn } from './utils'

export const SpecialActionCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()

  if (!rules) return <></>

  const actions = new SpecialActionCardHelper(rules.game).getCardActions(item.id as SpecialActionCard)

  return (
    <>
      <h2>{t(`help.special.action.card`)}</h2>
      <p>
        <Trans defaults={`help.special.action.card.descr`} />
      </p>
      {item.id && (
        <>
          <h3>{t(`help.actions`)}</h3>
          {actions.map((a, index) => (
            <p key={index}>
              <Trans defaults={`help.action.descr.${a.type}`} values={a} components={components} />
            </p>
          ))}
        </>
      )}
      <p css={note}>
        <Trans
          defaults={`help.special.action.card.note`}
          components={{
            ...components,
            ship: shipBtn(ShipCard.Ship18)
          }}
        />
      </p>
    </>
  )
}
