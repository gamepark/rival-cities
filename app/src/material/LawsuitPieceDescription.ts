import { CardDescription } from '@gamepark/react-game'
import LawsuitPiece from '../images/LawsuitPiece.png'

export class LawsuitPieceDescription extends CardDescription {
  width = 8.9
  height = 4.1
  image = LawsuitPiece
  transparency = true
  displayHelp = () => undefined
}

export const lawsuitPieceDescription = new LawsuitPieceDescription()
