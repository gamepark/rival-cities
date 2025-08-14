/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { BasicAction, basicCardAction } from '@gamepark/rival-cities/material/BasicAction'
import { Trans, useTranslation } from 'react-i18next'
import { ActionsHelp } from './ActionsHelp'

export function BasicActionCardHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()
  const action = basicCardAction[item.id as BasicAction]
  return (
    <>
      <h2>{t('help.card.basic')}</h2>
      <p>{t('help.card.basic.text')}</p>
      <ol>
        <li>{t('help.action.choice.1')}</li>
        <li>{t('help.action.choice.2')}</li>
        <li>
          <Trans defaults={'help.action.choice.3'} components={{ bold: <strong /> }} />
        </li>
      </ol>
      <ActionsHelp actions={[action]} />
    </>
  )
}
