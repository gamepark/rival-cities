import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import GameBoard from '../images/GameBoard.jpg'

export class GameBoardDescription extends BoardDescription {
  width = 38
  height = 38

  staticItem = {
    location: {
      type: LocationType.GameBoardPlace
    }
  }

  image = GameBoard
}

export const gameBoardDescription = new GameBoardDescription()
