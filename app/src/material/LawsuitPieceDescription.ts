import { CardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'
import LawsuitPiece from '../images/LawsuitPiece.png'

export class LawsuitPieceDescription extends CardDescription {
  width = 4.1
  height = 8.9

  image = LawsuitPiece

  getStaticItems(): MaterialItem[] {
    return [
      { location: { type: LocationType.LawsuitPieces, id: 0 } },
      { location: { type: LocationType.LawsuitPieces, id: 1 } },
      { location: { type: LocationType.LawsuitPieces, id: 2 } }
    ]
  }
}

export const lawsuitPieceDescription = new LawsuitPieceDescription()
