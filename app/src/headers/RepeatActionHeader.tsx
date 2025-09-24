import { HeaderText, Picture, useRules } from '@gamepark/react-game'
import { ActionType } from '@gamepark/rival-cities/material/Action'
import { CostType } from '@gamepark/rival-cities/material/Cost'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { RepeatActionRule } from '@gamepark/rival-cities/rules/RepeatActionRule'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import Draw from '../images/icons/Draw.png'
import Lawsuit from '../images/icons/Lawsuit.png'
import Prestige from '../images/icons/Prestige.png'
import { getProductIcon } from './HeaderIconsCss'

export const RepeatActionHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()!
  const { source, cost, extraAction } = new RepeatActionRule(rules.game).action
  const effect = source ? t(`help.card.alliance.${source}`) : t('ship.effect')
  const count = cost.amount
  const product = cost.type === CostType.Product ? cost.product : undefined
  const actionIcon = extraAction.type === ActionType.EarnPrestige ? Prestige : extraAction.type === ActionType.AdvanceLawsuit ? Lawsuit : Draw
  return (
    <HeaderText
      code="repeat-action"
      values={{ effect, count }}
      components={{ product: <Picture src={getProductIcon(product)} />, action: <Picture src={actionIcon} /> }}
      moves={{ pay: isMoveItemType(MaterialType.Product), pass: isCustomMoveType(CustomMoveType.Pass) }}
    />
  )
}
