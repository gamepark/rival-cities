import { Action } from '@gamepark/rival-cities/material/Action'
import { Trans } from 'react-i18next'
import { components } from '../material/help/utils'

interface ActionDescriptionProps {
  action: Action
}

export const ActionDescription = ({ action }: ActionDescriptionProps) => {
  return <Trans i18nKey={`help.action.descr.${action.type}`} components={components} />
}
