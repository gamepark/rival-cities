import { CardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import GameOverview from '../images/overview/en/GameOverview.jpg'

export class GameOverviewDescription extends CardDescription {
  width = 13.5
  height = 7.5

  image = GameOverview

  staticItem = { location: { type: LocationType.GameOverviewPlace } }
}

export const gameOverviewDescription = new GameOverviewDescription()
