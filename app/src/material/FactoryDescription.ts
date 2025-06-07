import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import FactoryFront from '../images/tokens/FactoryFront.png'
import FactoryBack from '../images/tokens/FactoryBack.png'

export class FactoryDescription extends CardDescription {
  width = 2.4
  height = 2.4

  backImage = FactoryBack

  image = FactoryFront

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }
}

export const factoryDescription = new FactoryDescription()
