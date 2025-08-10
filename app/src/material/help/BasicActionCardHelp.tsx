/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { ActionType } from '@gamepark/rival-cities/material/Action'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { BasicAction, basicCardAction } from '@gamepark/rival-cities/material/BasicAction'
import { Trans, useTranslation } from 'react-i18next'
import { allianceBtn, components, note } from './utils'

export function BasicActionCardHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()
  const action = basicCardAction[item.id as BasicAction]
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
              {action.type === ActionType.Split && index < action.actions.length - 1 && (
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
      {action.type === ActionType.Split && (
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
