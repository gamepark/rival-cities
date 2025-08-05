/** @jsxImportSource @emotion/react */
import { useRules } from '@gamepark/react-game'
import { Action, ComputedAction } from '@gamepark/rival-cities/material/Actions/Actions'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ComputedHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()

  const action: ComputedAction = rules?.remind<Action[]>(MemoryType.Actions)[0] as ComputedAction

  return (
    <>
      <h2>{t(`help.rule.actions`)}</h2>
      {action.actions.map((a, index) => (
        <p key={index}>
          <Trans defaults={`help.action.descr.${a.type}`} values={a} components={components} />
        </p>
      ))}
    </>
  )
}
