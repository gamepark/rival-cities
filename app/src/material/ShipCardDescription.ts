import { CardDescription } from '@gamepark/react-game'
import { ShipCard } from '@gamepark/rival-cities/material/ShipCard'
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

export class ShipCardDescription extends CardDescription {
  width = 4.36
  height = 6.76

  backImage = ShipBack

  images = {
    [ShipCard.Ship1]: Ship1,
    [ShipCard.Ship2]: Ship2,
    [ShipCard.Ship3]: Ship3,
    [ShipCard.Ship4]: Ship4,
    [ShipCard.Ship5]: Ship5,
    [ShipCard.Ship6]: Ship6,
    [ShipCard.Ship7]: Ship7,
    [ShipCard.Ship8]: Ship8,
    [ShipCard.Ship9]: Ship9,
    [ShipCard.Ship10]: Ship10,
    [ShipCard.Ship11]: Ship11,
    [ShipCard.Ship12]: Ship12,
    [ShipCard.Ship13]: Ship13,
    [ShipCard.Ship14]: Ship14,
    [ShipCard.Ship15]: Ship15,
    [ShipCard.Ship16]: Ship16,
    [ShipCard.Ship17]: Ship17,
    [ShipCard.Ship18]: Ship18,
    [ShipCard.Ship19]: Ship19,
    [ShipCard.Ship20]: Ship20,
    [ShipCard.Ship21]: Ship21,
  }
}

export const shipCardDescription = new ShipCardDescription()
