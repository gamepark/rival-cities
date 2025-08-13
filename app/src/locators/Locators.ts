import { DeckLocator, Locator } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { actionCardSpaceLocator } from './board/ActionCardSpaceLocator'
import { actionStackLocator } from './board/ActionStackLocator'
import { allianceSpaceLocator } from './board/AllianceSpaceLocator'
import { factorySupplyLocator } from './board/FactorySupplyLocator'
import { gameOverviewPlaceLocator } from './board/GameOverviewPlaceLocator'
import { inkSpaceLocator } from './board/InkSpaceLocator'
import { lawsuitMarkerSpaceLocator } from './board/LawsuitMarkerSpaceLocator'
import { lawsuitPieceSpotLocator } from './board/LawsuitPieceSpotLocator'
import { lawsuitSpaceLocator } from './board/LawsuitSpaceLocator'
import { lawsuitStackLocator } from './board/LawsuitStackLocator'
import { letterSupplyLocator } from './board/LetterSupplyLocator'
import { prestigeTrackLocator } from './board/PrestigeTrackLocator'
import { productSupplyLocator } from './board/ProductSupplyLocator'
import { shipSpaceLocator } from './board/ShipSpaceLocator'
import { shipStackLocator } from './board/ShipStackLocator'
import { starTokenSupplyLocator } from './board/StarTokenSupplyLocator'
import { playerAlliancesLocator } from './player/PlayerAlliancesLocator'
import { playerBellTokenLocator } from './player/PlayerBellTokenLocator'
import { playerFactoriesLocator } from './player/PlayerFactoriesLocator'
import { playerHandLocator } from './player/PlayerHandLocator'
import { playerLawsuitCardsLocator } from './player/PlayerLawsuitCardsLocator'
import { playerLettersLocator } from './player/PlayerLettersLocator'
import { playerProductsLocator } from './player/PlayerProductsLocator'
import { playerShipCardsLocator } from './player/PlayerShipCardsLocator'
import { playerStarTokensLocator } from './player/PlayerStarTokensLocator'

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
  [LocationType.PrestigeTrack]: prestigeTrackLocator,
  [LocationType.GameOverviewPlace]: gameOverviewPlaceLocator,
  [LocationType.ProductSupply]: productSupplyLocator,
  [LocationType.LetterSupply]: letterSupplyLocator,
  [LocationType.FactorySupply]: factorySupplyLocator,
  [LocationType.StarTokenSupply]: starTokenSupplyLocator,
  [LocationType.PlayerFactories]: playerFactoriesLocator,
  [LocationType.PlayerProducts]: playerProductsLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.PlayerAlliances]: playerAlliancesLocator,
  [LocationType.PlayerShipCards]: playerShipCardsLocator,
  [LocationType.PlayerLetters]: playerLettersLocator,
  [LocationType.PlayerStarTokens]: playerStarTokensLocator,
  [LocationType.PlayerBellToken]: playerBellTokenLocator,
  [LocationType.PlayerLawsuitCards]: playerLawsuitCardsLocator
}
