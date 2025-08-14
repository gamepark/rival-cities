/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { SpecialAction, specialCardActions } from '@gamepark/rival-cities/material/SpecialAction'
import { Trans, useTranslation } from 'react-i18next'
import { ActionsHelp } from './ActionsHelp'

export function SpecialActionCardHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()
  const actions = specialCardActions[item.id as SpecialAction]

  return (
    <>
      <h2>{t('help.card.special')}</h2>
      <p>{t('help.card.special.text')}</p>
      <ol>
        <li>{t('help.action.choice.1')}</li>
        <li>{t('help.action.choice.2')}</li>
        <li>
          <Trans defaults={'help.action.choice.3'} components={{ bold: <strong /> }} />
        </li>
        <li>{t('help.action.choice.4')}</li>
      </ol>
      <ActionsHelp actions={actions} />
    </>
  )
}
