/** @jsxImportSource @emotion/react */
import { HeaderText, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { AdvanceLawsuitRule } from '@gamepark/rival-cities/rules/actions/AdvanceLawsuitRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'

export const AdvanceLawsuitHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const action = new AdvanceLawsuitRule(rules.game).action
  return <HeaderText code={action.lawsuitIndex === undefined ? 'lawsuit' : 'lawsuit.again'} moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />
}
