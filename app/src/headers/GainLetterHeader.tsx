import { HeaderText, Picture, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { GainLetterRule } from '@gamepark/rival-cities/rules/actions/GainLetterRule'
import Letter from '../images/icons/Letter.png'

export const GainLetterHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const quantity = new GainLetterRule(rules.game).action.quantity ?? 1
  return <HeaderText code="gain-letter" values={{ quantity }} components={{ letter: <Picture src={Letter} /> }} />
}
