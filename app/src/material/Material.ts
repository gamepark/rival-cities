import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { allianceCardDescription } from './AllianceCardDescription'
import { basicActionCardDescription } from './BasicActionCardDescription'
import { bellTokenDescription } from './BellTokenDescription'
import { factoryDescription } from './FactoryDescription'
import { gameBoardDescription } from './GameBoardDescription'
import { gameOverviewDescription } from './GameOverviewDescription'
import { deutchAllianceCardDescription } from './i18n/de/DeutchAllianceCardDescription'
import { deutchBasicActionCardDescription } from './i18n/de/DeutchBasicActionCardDescription'
import { deutchGameOverviewDescription } from './i18n/de/DeutchGameOverviewDescription'
import { deutchLawsuitCardDescription } from './i18n/de/DeutchLawsuitCardDescription'
import { deutchOffSeasonOverviewDescription } from './i18n/de/DeutchOffSeasonOverviewDescription'
import { deutchShipCardDescription } from './i18n/de/DeutchShipCardDescription'
import { deutchSpecialActionCardDescription } from './i18n/de/DeutchSpecialActionCardDescription'
import { frenchAllianceCardDescription } from './i18n/fr/FrenchAllianceCardDescription'
import { frenchBasicActionCardDescription } from './i18n/fr/FrenchBasicActionCardDescription'
import { frenchGameOverviewDescription } from './i18n/fr/FrenchGameOverviewDescription'
import { frenchLawsuitCardDescription } from './i18n/fr/FrenchLawsuitCardDescription'
import { frenchLawsuitPieceDescription } from './i18n/fr/FrenchLawsuitPieceDescription'
import { frenchOffSeasonOverviewDescription } from './i18n/fr/FrenchOffSeasonOverviewDescription'
import { frenchShipCardDescription } from './i18n/fr/FrenchShipCardDescription'
import { frenchSpecialActionCardDescription } from './i18n/fr/FrenchSpecialActionCardDescription'
import { inkJarDescription } from './InkJarDescription'
import { lawsuitCardDescription } from './LawsuitCardDescription'
import { lawsuitMarkerDescription } from './LawsuitMarkerDescription'
import { lawsuitPieceDescription } from './LawsuitPieceDescription'
import { letterDescription } from './LetterDescription'
import { offSeasonOverviewDescription } from './OffSeasonOverviewDescription'
import { prestigeMarkerDescription } from './PrestigeMarkerDescription'
import { productDescription } from './ProductDescription'
import { shipCardDescription } from './ShipCardDescription'
import { specialActionCardDescription } from './SpecialActionCardDescription'
import { starTokenDescription } from './StarTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.GameBoard]: gameBoardDescription,
  [MaterialType.BasicActionCard]: basicActionCardDescription,
  [MaterialType.SpecialActionCard]: specialActionCardDescription,
  [MaterialType.AllianceCard]: allianceCardDescription,
  [MaterialType.LawsuitCard]: lawsuitCardDescription,
  [MaterialType.ShipCard]: shipCardDescription,
  [MaterialType.GameOverview]: gameOverviewDescription,
  [MaterialType.OffSeasonOverview]: offSeasonOverviewDescription,
  [MaterialType.Product]: productDescription,
  [MaterialType.Letter]: letterDescription,
  [MaterialType.Factory]: factoryDescription,
  [MaterialType.LawsuitPiece]: lawsuitPieceDescription,
  [MaterialType.StarToken]: starTokenDescription,
  [MaterialType.InkJar]: inkJarDescription,
  [MaterialType.PrestigeMarker]: prestigeMarkerDescription,
  [MaterialType.LawsuitMarker]: lawsuitMarkerDescription,
  [MaterialType.BellToken]: bellTokenDescription
}

export const MaterialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  de: {
    [MaterialType.BasicActionCard]: deutchBasicActionCardDescription,
    [MaterialType.SpecialActionCard]: deutchSpecialActionCardDescription,
    [MaterialType.AllianceCard]: deutchAllianceCardDescription,
    [MaterialType.LawsuitCard]: deutchLawsuitCardDescription,
    [MaterialType.ShipCard]: deutchShipCardDescription,
    [MaterialType.GameOverview]: deutchGameOverviewDescription,
    [MaterialType.OffSeasonOverview]: deutchOffSeasonOverviewDescription
  },
  fr: {
    [MaterialType.BasicActionCard]: frenchBasicActionCardDescription,
    [MaterialType.SpecialActionCard]: frenchSpecialActionCardDescription,
    [MaterialType.AllianceCard]: frenchAllianceCardDescription,
    [MaterialType.LawsuitCard]: frenchLawsuitCardDescription,
    [MaterialType.ShipCard]: frenchShipCardDescription,
    [MaterialType.GameOverview]: frenchGameOverviewDescription,
    [MaterialType.OffSeasonOverview]: frenchOffSeasonOverviewDescription,
    [MaterialType.LawsuitPiece]: frenchLawsuitPieceDescription
  }
}
