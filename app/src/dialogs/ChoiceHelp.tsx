/** @jsxImportSource @emotion/react */
import { useRules } from '@gamepark/react-game'
import { ActionType } from '@gamepark/rival-cities/material/Actions/ActionType'
import { BasicActionCard } from '@gamepark/rival-cities/material/BasicActionCard'
import { BasicActionCardHelper } from '@gamepark/rival-cities/material/helper/BasicActionCardHelper'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ChoiceHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()
  const inkjarLocation = rules?.material(MaterialType.InkJar).getItem()?.location.id

  const basicCardInInkjarLocation = rules
    ?.material(MaterialType.BasicActionCard)
    .location((loc) => loc.id === inkjarLocation)
    .getItem()?.id

  if (!basicCardInInkjarLocation) return <></>

  const action = new BasicActionCardHelper(rules.game).basicActionCardActions[basicCardInInkjarLocation as BasicActionCard]

  const isMultiChoiceCard = action.type === ActionType.Choice

  return (
    <>
      <h2>{t(`help.rule.actions`)}</h2>
      {action.type === ActionType.Computed || action.type === ActionType.Choice ? (
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
    </>
  )
}
