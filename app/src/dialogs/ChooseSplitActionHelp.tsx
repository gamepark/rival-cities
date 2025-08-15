/** @jsxImportSource @emotion/react */
import { useRules } from '@gamepark/react-game'
import { ActionType } from '@gamepark/rival-cities/material/Action'
import { BasicAction, basicCardAction } from '@gamepark/rival-cities/material/BasicAction'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ChooseSplitActionHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()!
  const inkJarLocation = rules?.material(MaterialType.InkJar).getItem()?.location.id
  const basicAction = rules.material(MaterialType.BasicActionCard).locationId(inkJarLocation).getItem<BasicAction>()!.id
  const action = basicCardAction[basicAction]
  return (
    <>
      <h2>{t('help.rule.actions')}</h2>
      {action.type === ActionType.Multiple || action.type === ActionType.Split ? (
        <>
          {action.actions.map((a, index) => (
            <div key={index}>
              <p>
                <Trans defaults={`help.action.descr.${a.type}`} values={a} components={components} />
              </p>
              {action.type === ActionType.Split && index < action.actions.length - 1 && (
                <p>
                  <b>{t('or')}</b>
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
    </>
  )
}
