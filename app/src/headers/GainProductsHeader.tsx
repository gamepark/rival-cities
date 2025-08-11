/** @jsxImportSource @emotion/react */
import { HeaderText, Picture, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { GainProductsRule } from '@gamepark/rival-cities/rules/actions/GainProductsRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { getProductIcon } from './HeaderIconsCss'

export const GainProductsHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const { product, quantity } = new GainProductsRule(rules.game).action
  return (
    <HeaderText
      code="gain-product"
      values={{ quantity }}
      components={{ product: <Picture src={getProductIcon(product)} /> }}
      moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }}
    />
  )
}
