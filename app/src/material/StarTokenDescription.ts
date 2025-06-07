import { CardDescription } from '@gamepark/react-game'
import StarToken from '../images/tokens/Star.jpg'

export class StarTokenDescription extends CardDescription {
  width = 1.7
  height = 1.7
  borderRadius = 0.9

  image = StarToken
}

export const starTokenDescription = new StarTokenDescription()
