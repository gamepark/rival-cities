import { TokenDescription } from '@gamepark/react-game'
import LawsuitMarker from '../images/tokens/LawersuitMarker.png'

export class LawsuitMarkerDescription extends TokenDescription {
  width = 1.04
  height = 1.06

  image = LawsuitMarker
}

export const lawsuitMarkerDescription = new LawsuitMarkerDescription()
