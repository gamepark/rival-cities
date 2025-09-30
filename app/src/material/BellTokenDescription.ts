import { CardDescription } from '@gamepark/react-game'
import BellToken from '../images/tokens/Bell.png'
import { BellTokenHelp } from './help/BellTokenHelp'

export class BellTokenDescription extends CardDescription {
  width = 3
  height = 4.8
  image = BellToken
  transparency = true
  help = BellTokenHelp
}

export const bellTokenDescription = new BellTokenDescription()
