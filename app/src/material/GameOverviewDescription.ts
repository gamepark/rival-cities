import { CardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import GameOverview from '../images/overview/en/GameOverview.jpg'
import { GameOverviewHelp } from './help/GameOverviewHelp'

export class GameOverviewDescription extends CardDescription {
  width = 13.5
  height = 7.5

  image = GameOverview

  staticItem = { location: { type: LocationType.GameOverviewPlace } }

  help = GameOverviewHelp
}

export const gameOverviewDescription = new GameOverviewDescription()
