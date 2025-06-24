/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { BasicActionCard, basicActionCardActions } from '@gamepark/rival-cities/material/BasicActionCard'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { allianceBtn, components, note } from './utils'
import { AllianceCard } from '@gamepark/rival-cities/material/AllianceCard'

export const BasicActionCardHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const actions = basicActionCardActions[item.id as BasicActionCard]

  const isMultiChoiceCard = actions.length > 1 && item.id !== BasicActionCard.BasicAction8

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
      {actions.map((action, index) => (
        <div key={index}>
          <p>
            <Trans defaults={`help.action.descr.${action}`} components={components} />
          </p>
          {isMultiChoiceCard && index < actions.length - 1 && (
            <p>
              <b>{t(`help.action.descr.or`)}</b>
            </p>
          )}
        </div>
      ))}
      {isMultiChoiceCard && (
        <p css={note}>
          <Trans
            defaults={`help.basic.action.card.note`}
            components={{
              ...components,
              alliance: allianceBtn(AllianceCard.AllianceGdansk)
            }}
          />
        </p>
      )}
    </>
  )
}
