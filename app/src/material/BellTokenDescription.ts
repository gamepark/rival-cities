import { CardDescription } from '@gamepark/react-game'
import BellToken from '../images/tokens/Bell.png'

export class BellTokenDescription extends CardDescription {
  width = 3
  height = 4.8

  image = BellToken
}

export const bellTokenDescription = new BellTokenDescription()
