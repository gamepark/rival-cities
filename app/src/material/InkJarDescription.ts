import { css, Interpolation, Theme } from '@emotion/react'
import { TokenDescription } from '@gamepark/react-game'
import InkJar from '../images/tokens/InkJar.png'
import { InkJarHelp } from './help/InkJarHelp'

export class InkJarDescription extends TokenDescription {
  width = 2.8
  height = 2.8

  image = InkJar
  transparency = true

  getFrontExtraCss(): Interpolation<Theme> {
    return css`
      clip-path: polygon(37% 3%, 73% 2%, 73% 25%, 100% 40%, 82% 89%, 70% 100%, 16% 100%, 0% 53%, 28% 27%, 28% 14%);
    `
  }

  help = InkJarHelp
}

export const inkJarDescription = new InkJarDescription()
