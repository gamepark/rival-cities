import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { City } from '@gamepark/rival-cities/City'
import { Locator } from '@gamepark/react-game'
import { allianceCardsLayoutLocator } from './board/AllianceCardsLayoutLocator'
import { bellTokenIdleLocator } from './board/BellTokenIdleLocator'
import { cardPisteLocator } from './board/CardPisteLocator'
import { factoryDeckLocator } from './board/FactoryDeckLocator'
import { gameOverviewPlaceLocator } from './board/GameOverviewPlaceLocator'
import { inkJarPisteLocator } from './board/InkJarPisteLocator'
import { lawsuitCardDeckLocator } from './board/LawsuitCardDeckLocator'
import { lawsuitCardsRiverLocator } from './board/LawsuitCardsRiverLocator'
import { lawsuitMarkerPisteLocator } from './board/LawsuitMarkerPisteLocator'
import { lawsuitPiecesLocator } from './board/LawsuitPiecesLocator'
import { letterDeckLocator } from './board/LetterDeckLocator'
import { prestigeMarkerPisteLocator } from './board/PrestigeMarkerPisteLocator'
import { productPilesLocator } from './board/ProductPilesLocator'
import { sepcialActionCardsDeckLocator } from './board/SepcialActionCardsDeckLocator'
import { sepcialActionCardsDiscardLocator } from './board/SepcialActionCardsDiscardLocator'
import { shipCardsDeckLocator } from './board/ShipCardsDeckLocator'
import { shipCardsRiverLocator } from './board/ShipCardsRiverLocator'
import { starTokenDeckLocator } from './board/StarTokenDeckLocator'
import { gameBoardLocator } from './GameBoardLocator'
import { playerFactoriesLocator } from './player/PlayerFactoriesLocator'
import { playerProductsLocator } from './player/PlayerProductsLocator'

export const Locators: Partial<Record<LocationType, Locator<City, MaterialType, LocationType>>> = {
  [LocationType.GameBoard]: gameBoardLocator,
  [LocationType.BellTokenIdle]: bellTokenIdleLocator,
  [LocationType.CardPiste]: cardPisteLocator,
  [LocationType.SpecialActionCardsDeck]: sepcialActionCardsDeckLocator,
  [LocationType.SpecialActionCardsDiscard]: sepcialActionCardsDiscardLocator,
  [LocationType.ShipCardsDeck]: shipCardsDeckLocator,
  [LocationType.ShipCardsRiver]: shipCardsRiverLocator,
  [LocationType.LawsuitCardDeck]: lawsuitCardDeckLocator,
  [LocationType.LawsuitCardsRiver]: lawsuitCardsRiverLocator,
  [LocationType.LawsuitPieces]: lawsuitPiecesLocator,
  [LocationType.LawsuitMarkerPiste]: lawsuitMarkerPisteLocator,
  [LocationType.AllianceCardsLayout]: allianceCardsLayoutLocator,
  [LocationType.InkJarPiste]: inkJarPisteLocator,
  [LocationType.PrestigeMarkerPiste]: prestigeMarkerPisteLocator,
  [LocationType.GameOverviewPlace]: gameOverviewPlaceLocator,
  [LocationType.ProductPiles]: productPilesLocator,
  [LocationType.LetterDeck]: letterDeckLocator,
  [LocationType.FactoryDeck]: factoryDeckLocator,
  [LocationType.StarTokenDeck]: starTokenDeckLocator,
  [LocationType.PlayerFactories]: playerFactoriesLocator,
  [LocationType.PlayerProducts]: playerProductsLocator,
}
