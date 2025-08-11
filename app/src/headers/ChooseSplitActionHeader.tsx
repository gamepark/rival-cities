/** @jsxImportSource @emotion/react */
import { HeaderText, useRules } from '@gamepark/react-game'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { ChooseSplitActionRule } from '@gamepark/rival-cities/rules/actions/ChooseSplitActionRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'

export const ChooseSplitActionHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const code = new ChooseSplitActionRule(rules.game).hasAlliance(Alliance.Gdansk) ? 'multiple' : 'choice'
  return <HeaderText code={code} moves={{ pass: isCustomMoveType(CustomMoveType.Pass) }} />
}
