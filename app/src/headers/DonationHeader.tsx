/** @jsxImportSource @emotion/react */
import { HeaderText, Picture, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { DonationRule } from '@gamepark/rival-cities/rules/actions/DonationRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import Star from '../images/icons/Star.png'
import { getProductIcon } from './HeaderIconsCss'

export const DonationHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const { cost, product, stars, times } = new DonationRule(rules.game).action
  const count = rules.remind<number>(Memory.Count)
  if (count) {
    return <HeaderText code="donation.pay" values={{ count }} components={{ product: <Picture src={getProductIcon()} /> }} />
  } else {
    return (
      <HeaderText
        code="donation"
        values={{ cost, stars, times }}
        components={{
          item: <Picture src={getProductIcon(product)} />,
          star: <Picture src={Star} />
        }}
        moves={{
          donate: isMoveItemType(MaterialType.StarToken),
          pass: isCustomMoveType(CustomMoveType.Pass)
        }}
      />
    )
  }
}
