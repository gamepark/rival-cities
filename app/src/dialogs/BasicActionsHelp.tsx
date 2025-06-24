/** @jsxImportSource @emotion/react */
import { useRules } from '@gamepark/react-game'
import { basicActionCardActions, BasicActionCard } from '@gamepark/rival-cities/material/BasicActionCard'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const BasicActionsHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()
  const inkjarLocation = rules?.material(MaterialType.InkJar).getItem()?.location.id

  const basicCardInInkjarLocation = rules?.material(MaterialType.BasicActionCard).location(loc => loc.id === inkjarLocation).getItem()?.id

  if(!basicCardInInkjarLocation) return <></>

    const actions = basicActionCardActions[basicCardInInkjarLocation as BasicActionCard]
  
    const isMultiChoiceCard = actions.length > 1 && basicCardInInkjarLocation !== BasicActionCard.BasicAction8

  return (
    <>
      <h2>{t(`help.rule.actions`)}</h2>
      {actions.map((action, index) => (
              <div key={index}>
                <p>
                  <Trans defaults={`help.action.descr.${action}`} components={components} />
                </p>
                {
                  isMultiChoiceCard && index < actions.length - 1 && <p><b>{t(`help.action.descr.or`)}</b></p>
                }
              </div>
            ))}
    </>
  )
}
