/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'

class GameBoardLocator extends Locator {
  coordinates = { x: 0, y: 0 }
}

export const gameBoardLocator = new GameBoardLocator()
