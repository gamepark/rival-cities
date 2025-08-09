import { CardDescription, ItemContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Ship } from '@gamepark/rival-cities/material/Ship'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import Ship1 from '../images/cards/ship/en/Ship01.jpg'
import Ship2 from '../images/cards/ship/en/Ship02.jpg'
import Ship3 from '../images/cards/ship/en/Ship03.jpg'
import Ship4 from '../images/cards/ship/en/Ship04.jpg'
import Ship5 from '../images/cards/ship/en/Ship05.jpg'
import Ship6 from '../images/cards/ship/en/Ship06.jpg'
import Ship7 from '../images/cards/ship/en/Ship07.jpg'
import Ship8 from '../images/cards/ship/en/Ship08.jpg'
import Ship9 from '../images/cards/ship/en/Ship09.jpg'
import Ship10 from '../images/cards/ship/en/Ship10.jpg'
import Ship11 from '../images/cards/ship/en/Ship11.jpg'
import Ship12 from '../images/cards/ship/en/Ship12.jpg'
import Ship13 from '../images/cards/ship/en/Ship13.jpg'
import Ship14 from '../images/cards/ship/en/Ship14.jpg'
import Ship15 from '../images/cards/ship/en/Ship15.jpg'
import Ship16 from '../images/cards/ship/en/Ship16.jpg'
import Ship17 from '../images/cards/ship/en/Ship17.jpg'
import Ship18 from '../images/cards/ship/en/Ship18.jpg'
import Ship19 from '../images/cards/ship/en/Ship19.jpg'
import Ship20 from '../images/cards/ship/en/Ship20.jpg'
import Ship21 from '../images/cards/ship/en/Ship21.jpg'
import ShipBack from '../images/cards/ship/ShipBack.jpg'
import { ShipCardHelp } from './help/ShipCardHelp'

export class ShipCardDescription extends CardDescription {
  width = 4.35
  height = 6.75

  backImage = ShipBack

  images = {
    [Ship.Ship1]: Ship1,
    [Ship.Ship2]: Ship2,
    [Ship.Ship3]: Ship3,
    [Ship.Ship4]: Ship4,
    [Ship.Ship5]: Ship5,
    [Ship.Ship6]: Ship6,
    [Ship.Ship7]: Ship7,
    [Ship.Ship8]: Ship8,
    [Ship.Ship9]: Ship9,
    [Ship.Ship10]: Ship10,
    [Ship.Ship11]: Ship11,
    [Ship.Ship12]: Ship12,
    [Ship.Ship13]: Ship13,
    [Ship.Ship14]: Ship14,
    [Ship.Ship15]: Ship15,
    [Ship.Ship16]: Ship16,
    [Ship.Ship17]: Ship17,
    [Ship.Ship18]: Ship18,
    [Ship.Ship19]: Ship19,
    [Ship.Ship20]: Ship20,
    [Ship.Ship21]: Ship21
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.ShipCard)(move) && context.index === move.itemIndex
  }

  help = ShipCardHelp
}

export const shipCardDescription = new ShipCardDescription()
