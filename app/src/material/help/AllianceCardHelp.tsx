/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Alliance, alliancesData } from '@gamepark/rival-cities/material/Alliance'
import { CostType } from '@gamepark/rival-cities/material/Cost'
import { Trans, useTranslation } from 'react-i18next'
import { getProductIcon } from '../../headers/HeaderIconsCss'
import Letter from '../../images/icons/Letter.png'
import Product from '../../images/icons/Product.png'
import Star from '../../images/icons/Star.png'
import { components, note } from './utils'

export function AllianceCardHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()
  const alliance = item.id as Alliance
  const upkeepCost = alliancesData[alliance].cost
  const upkeepItem = upkeepCost.type === CostType.Letters ? Letter : upkeepCost.type === CostType.AnyProducts ? Product : getProductIcon(upkeepCost.product)
  return (
    <>
      <h2>{t('help.card.alliance')}</h2>
      <p>
        <Trans defaults="help.card.alliance.text" components={{ ...components, letter: <Picture src={Letter} /> }} />
      </p>
      <h3>{t(`help.card.alliance.${item.id}`)}</h3>
      <p>
        <Trans defaults="help.card.alliance.upkeep" values={upkeepCost} components={{ ...components, item: <Picture src={upkeepItem} /> }} />
      </p>
      <p>
        <Trans defaults={`help.card.alliance.${item.id}.text`} components={components} />
      </p>
      <p>
        <Trans defaults="help.card.stars" values={{ stars: alliancesData[alliance].stars }} components={{ star: <Picture src={Star} /> }} />
      </p>
      <p css={note}>
        <Trans defaults="help.card.alliance.win" components={components} />
      </p>
    </>
  )
}
