/** @jsxImportSource @emotion/react */
import { HeaderText, Picture, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { ProductionRule } from '@gamepark/rival-cities/rules/actions/ProductionRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { getProductIcon } from './HeaderIconsCss'

export const ProductionHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const { product, quantity } = new ProductionRule(rules.game).action
  const code = quantity > 0 ? 'production' : 'production.factory'
  return <HeaderText code={code} components={{ product: <Picture src={getProductIcon(product)} /> }} moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />
}
