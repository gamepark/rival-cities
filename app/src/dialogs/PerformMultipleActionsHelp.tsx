import { useRules } from '@gamepark/react-game'
import { Action, MultipleActions } from '@gamepark/rival-cities/material/Action'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const PerformMultipleActionsHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()

  const action: MultipleActions = rules?.remind<Action[]>(Memory.Actions)[0] as MultipleActions

  return (
    <>
      <h2>{t('help.rule.actions')}</h2>
      {action.actions.map((a, index) => (
        <p key={index}>
          <Trans i18nKey={`help.action.descr.${a.type}`} values={a} components={components} />
        </p>
      ))}
    </>
  )
}
