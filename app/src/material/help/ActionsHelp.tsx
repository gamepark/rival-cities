import { Picture } from '@gamepark/react-game'
import { Action, ActionType } from '@gamepark/rival-cities/material/Action'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { CostType } from '@gamepark/rival-cities/material/Cost'
import { Product } from '@gamepark/rival-cities/material/Product'
import { Trans, useTranslation } from 'react-i18next'
import { getProductIcon } from '../../headers/HeaderIconsCss'
import Lawsuit from '../../images/icons/Lawsuit.png'
import Letter from '../../images/icons/Letter.png'
import Star from '../../images/icons/Star.png'
import { allianceBtn, components, note } from './utils'

type Props = {
  actions: Action[]
}

export function ActionsHelp({ actions }: Props) {
  const { t } = useTranslation()
  return (
    <>
      <h3>{t('help.actions')}</h3>
      {actions.map((action, index) => (
        <ActionHelp key={index} action={action} />
      ))}
    </>
  )
}

export function ActionHelp({ action }: { action: Action }) {
  const { t } = useTranslation()
  switch (action.type) {
    case ActionType.Split:
      return (
        <>
          <ActionHelp action={action.actions[0]} />
          <p>
            <strong>{t('or')}</strong>
          </p>
          <ActionHelp action={action.actions[1]} />
          <p css={note}>
            <Trans i18nKey="help.action.split.note" components={{ ...components, alliance: allianceBtn(Alliance.Gdansk) }} />
          </p>
        </>
      )
    case ActionType.Multiple:
      return (
        <>
          {action.actions.map((subAction, index) => (
            <ActionHelp key={index} action={subAction} />
          ))}
        </>
      )
    case ActionType.Production:
    case ActionType.GainProducts:
      if (action.product) {
        return (
          <p>
            <Trans
              i18nKey={`help.action.${action.type}`}
              values={action}
              components={{ ...components, product: <Picture src={getProductIcon(action.product)} /> }}
            />
          </p>
        )
      } else {
        return (
          <p>
            <Trans
              i18nKey={`help.action.${action.type}.any`}
              values={action}
              components={{
                ...components,
                product: <Picture src={getProductIcon()} />,
                beer: <Picture src={getProductIcon(Product.Beer)} />,
                cloth: <Picture src={getProductIcon(Product.Cloth)} />,
                leather: <Picture src={getProductIcon(Product.Leather)} />,
                furniture: <Picture src={getProductIcon(Product.Furniture)} />
              }}
            />
          </p>
        )
      }
    case ActionType.Donation:
      return (
        <p>
          <Trans
            i18nKey={`help.action.${action.type}`}
            values={{ ...action, cost: action.cost.amount }}
            components={{
              ...components,
              product: <Picture src={getProductIcon(action.cost.type === CostType.Product ? action.cost.product : undefined)} />,
              star: <Picture src={Star} />
            }}
          />
        </p>
      )
    case ActionType.GainLetter:
      return (
        <p>
          <Trans
            i18nKey={`help.action.${action.type}`}
            values={{ ...action, quantity: action.quantity ?? 1 }}
            components={{
              ...components,
              letter: <Picture src={Letter} />
            }}
          />
        </p>
      )
    case ActionType.BuildFactory:
      return (
        <p>
          <Trans i18nKey={`help.action.${action.type}${action.cost ? '' : '.free'}`} values={action} components={components} />
        </p>
      )
    case ActionType.EarnPrestige:
      return (
        <p>
          <Trans i18nKey={`help.action.${action.type}${action.rival ? '.rival' : ''}`} values={action} components={components} />
        </p>
      )
    case ActionType.AdvanceLawsuit:
      return (
        <p>
          <Trans i18nKey={`help.action.${action.type}`} values={action} components={{ ...components, lawsuit: <Picture src={Lawsuit} /> }} />
        </p>
      )
    case ActionType.GainStars:
      return (
        <p>
          <Trans i18nKey={`help.action.${action.type}`} values={action} components={{ ...components, star: <Picture src={Star} /> }} />
        </p>
      )
    default:
      return (
        <p>
          <Trans i18nKey={`help.action.${action.type}`} values={action} components={components} />
        </p>
      )
  }
}
