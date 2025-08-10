/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { ActionType } from '@gamepark/rival-cities/material/Action'
import { SpecialActionCardHelper } from '@gamepark/rival-cities/material/helper/SpecialActionCardHelper'
import { Ship } from '@gamepark/rival-cities/material/Ship'
import { SpecialAction } from '@gamepark/rival-cities/material/SpecialAction'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, note, shipBtn } from './utils'

export const SpecialActionCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()

  if (!rules) return <></>

  const actions = new SpecialActionCardHelper(rules.game).getCardMultipleActions(item.id as SpecialAction)

  // TODO fix and factorize actions help
  return (
    <>
      <h2>{t(`help.special.action.card`)}</h2>
      <p>
        <Trans defaults={`help.special.action.card.descr`} />
      </p>
      {item.id && (
        <>
          <h3>{t(`help.actions`)}</h3>
          {actions.map((a, index) => {
            const rival = a.type === ActionType.EarnPrestige && a.rival ? '.rival' : ''
            return (
              <p key={index}>
                <Trans defaults={`help.action.descr.${a.type}${rival}`} values={a} components={components} />
              </p>
            )
          })}
        </>
      )}
      <p css={note}>
        <Trans
          defaults={`help.special.action.card.note`}
          components={{
            ...components,
            ship: shipBtn(Ship.Ship18)
          }}
        />
      </p>
    </>
  )
}
