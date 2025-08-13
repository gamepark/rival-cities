import { DeckLocator, Locator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { actionCardSpaceLocator } from './board/ActionCardSpaceLocator'
import { actionStackLocator } from './board/ActionStackLocator'
import { allianceSpaceLocator } from './board/AllianceSpaceLocator'
import { factoryDeckLocator } from './board/FactoryDeckLocator'
import { gameOverviewPlaceLocator } from './board/GameOverviewPlaceLocator'
import { inkSpaceLocator } from './board/InkSpaceLocator'
import { lawsuitMarkerSpaceLocator } from './board/LawsuitMarkerSpaceLocator'
import { lawsuitPieceSpotLocator } from './board/LawsuitPieceSpotLocator'
import { lawsuitSpaceLocator } from './board/LawsuitSpaceLocator'
import { lawsuitStackLocator } from './board/LawsuitStackLocator'
import { letterDeckLocator } from './board/LetterDeckLocator'
import { prestigeMarkerPisteLocator } from './board/PrestigeMarkerPisteLocator'
import { productPilesLocator } from './board/ProductPilesLocator'
import { shipSpaceLocator } from './board/ShipSpaceLocator'
import { shipStackLocator } from './board/ShipStackLocator'
import { starTokenDeckLocator } from './board/StarTokenDeckLocator'
import { playerAlliancesLocator } from './player/PlayerAlliancesLocator'
import { playerBellTokenLocator } from './player/PlayerBellTokenLocator'
import { playerFactoriesLocator } from './player/PlayerFactoriesLocator'
import { playerLawsuitCardsLocator } from './player/PlayerLawsuitCardsLocator'
import { playerLettersDeckLocator } from './player/PlayerLettersDeckLocator'
import { playerProductsLocator } from './player/PlayerProductsLocator'
import { playerShipCardsLocator } from './player/PlayerShipCardsLocator'
import { playerSpecialActionCardsHandLocator } from './player/PlayerSpecialActionCardsHandLocator'
import { playerStarTokensDeckLocator } from './player/PlayerStarTokensDeckLocator'

export const Locators: Partial<Record<LocationType, Locator<City, MaterialType, LocationType>>> = {
  [LocationType.BellTokenSpot]: new Locator({ parentItemType: MaterialType.GameBoard, positionOnParent: { x: 42, y: 1 }, rotateZ: 10 }),
  [LocationType.ActionCardSpace]: actionCardSpaceLocator,
  [LocationType.ActionStack]: actionStackLocator,
  [LocationType.SpecialActionCardDiscard]: new DeckLocator({ coordinates: { x: 9, y: -27 } }),
  [LocationType.ShipStack]: shipStackLocator,
  [LocationType.ShipSpace]: shipSpaceLocator,
  [LocationType.LawsuitStack]: lawsuitStackLocator,
  [LocationType.LawsuitSpace]: lawsuitSpaceLocator,
  [LocationType.LawsuitPieceSpot]: lawsuitPieceSpotLocator,
  [LocationType.LawsuitMarkerSpace]: lawsuitMarkerSpaceLocator,
  [LocationType.AllianceSpace]: allianceSpaceLocator,
  [LocationType.InkSpace]: inkSpaceLocator,
  [LocationType.PrestigeMarkerPiste]: prestigeMarkerPisteLocator,
  [LocationType.GameOverviewPlace]: gameOverviewPlaceLocator,
  [LocationType.ProductPiles]: productPilesLocator,
  [LocationType.LetterDeck]: letterDeckLocator,
  [LocationType.FactoryDeck]: factoryDeckLocator,
  [LocationType.StarTokenDeck]: starTokenDeckLocator,
  [LocationType.PlayerFactories]: playerFactoriesLocator,
  [LocationType.PlayerProducts]: playerProductsLocator,
  [LocationType.PlayerSpecialActionCardsHand]: playerSpecialActionCardsHandLocator,
  [LocationType.PlayerAlliances]: playerAlliancesLocator,
  [LocationType.PlayerShipCards]: playerShipCardsLocator,
  [LocationType.PlayerLetterDeck]: playerLettersDeckLocator,
  [LocationType.PlayerStarTokens]: playerStarTokensDeckLocator,
  [LocationType.PlayerBellToken]: playerBellTokenLocator,
  [LocationType.PlayerLawsuitCards]: playerLawsuitCardsLocator
}
