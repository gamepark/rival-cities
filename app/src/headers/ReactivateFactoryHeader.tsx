import { HeaderText, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { ReactivateFactoryRule } from '@gamepark/rival-cities/rules/actions/ReactivateFactoryRule'

export const ReactivateFactoryHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const count = new ReactivateFactoryRule(rules.game).action.count
  return <HeaderText code="reactivate-factory" values={{ count }} />
}
