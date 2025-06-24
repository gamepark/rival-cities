import { CardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import OffSeasonOverview from '../images/overview/en/OffSeasonOverview.jpg'
import { OffSeasonOverviewHelp } from './help/OffSeasonOverviewHelp'

export class OffSeasonOverviewDescription extends CardDescription {
  width = 7.5
  height = 11.5

  staticItem = { location: { type: LocationType.CardPiste, id: 0 } }

  image = OffSeasonOverview

  help = OffSeasonOverviewHelp
}

export const offSeasonOverviewDescription = new OffSeasonOverviewDescription()
