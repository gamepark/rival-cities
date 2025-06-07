import { TokenDescription } from '@gamepark/react-game'
import PrestigeMarker from '../images/tokens/PrestigeMarker.png'

export class PrestigeMarkerDescription extends TokenDescription {
  width = 1.52
  height = 1.31

  image = PrestigeMarker
}

export const prestigeMarkerDescription = new PrestigeMarkerDescription()
