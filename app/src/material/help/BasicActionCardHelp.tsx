/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { ActionType } from '@gamepark/rival-cities/material/Actions/ActionType'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { BasicActionCard } from '@gamepark/rival-cities/material/BasicActionCard'
import { BasicActionCardHelper } from '@gamepark/rival-cities/material/helper/BasicActionCardHelper'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { allianceBtn, components, note } from './utils'

export const BasicActionCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()
  if (!rules) return <></>
  const action = new BasicActionCardHelper(rules.game).getCardAction(item.id as BasicActionCard)
  const isMultiChoiceCard = action.type === ActionType.Split

  return (
    <>
      <h2>{t(`help.basic.action.card`)}</h2>
      <p>
        <Trans defaults={`help.basic.action.card.descr`} />
      </p>
      <ul>
        <li>
          <Trans defaults={`help.basic.action.card.choice.1`} />
        </li>
        <li>
          <Trans defaults={`help.basic.action.card.choice.2`} />
        </li>
        <li>
          <Trans defaults={`help.basic.action.card.choice.3`} />
        </li>
      </ul>
      <h3>{t(`help.actions`)}</h3>
      {action.type === ActionType.Multiple || action.type === ActionType.Split ? (
        <>
          {action.actions.map((a, index) => (
            <div key={index}>
              <p>
                <Trans defaults={`help.action.descr.${a.type}`} values={a} components={components} />
              </p>
              {isMultiChoiceCard && index < action.actions.length - 1 && (
                <p>
                  <b>{t(`help.action.descr.or`)}</b>
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>
          <Trans defaults={`help.action.descr.${action.type}`} values={action} components={components} />
        </p>
      )}
      {isMultiChoiceCard && (
        <p css={note}>
          <Trans
            defaults={`help.basic.action.card.note`}
            components={{
              ...components,
              alliance: allianceBtn(Alliance.Gdansk)
            }}
          />
        </p>
      )}
    </>
  )
}
