import { TokenDescription } from '@gamepark/react-game'
import InkJar from '../images/tokens/InkJar.png'

export class InkJarDescription extends TokenDescription {
  width = 2
  height = 1.92

  image = InkJar
}

export const inkJarDescription = new InkJarDescription()
