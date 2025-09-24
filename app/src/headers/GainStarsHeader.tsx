import { HeaderText, Picture, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { GainStarsRule } from '@gamepark/rival-cities/rules/actions/GainStarsRule'
import Star from '../images/icons/Star.png'

export const GainStarsHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const count = new GainStarsRule(rules.game).action.stars
  return <HeaderText code="gain-stars" values={{ count }} components={{ star: <Picture src={Star} /> }} />
}
