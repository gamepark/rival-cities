/** @jsxImportSource @emotion/react */
import { useRules } from '@gamepark/react-game'
import { ActionType } from '@gamepark/rival-cities/material/Action'
import { BasicAction } from '@gamepark/rival-cities/material/BasicAction'
import { BasicActionCardHelper } from '@gamepark/rival-cities/material/helper/BasicActionCardHelper'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ChooseSplitActionHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()
  const inkjarLocation = rules?.material(MaterialType.InkJar).getItem()?.location.id

  const basicCardInInkjarLocation = rules
    ?.material(MaterialType.BasicActionCard)
    .location((loc) => loc.id === inkjarLocation)
    .getItem()?.id

  if (!basicCardInInkjarLocation) return <></>

  const action = new BasicActionCardHelper(rules.game).getCardAction(basicCardInInkjarLocation as BasicAction)

  const isMultiChoiceCard = action.type === ActionType.Split

  return (
    <>
      <h2>{t(`help.rule.actions`)}</h2>
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
    </>
  )
}
