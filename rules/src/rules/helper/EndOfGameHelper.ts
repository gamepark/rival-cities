import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { Alliance, alliancesData } from '../../material/Alliance'
import { Lawsuit, lawsuitData } from '../../material/Lawsuit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Ship, shipData } from '../../material/Ship'

export class EndOfGameHelper extends PlayerTurnRule {
  checkOffSeasonEndOfGame(moveIfGameNotEnded: MaterialMove): MaterialMove[] {
    if (this.factoryDeckIsEmpty || this.starTokensDeckIsEmpty || this.noLawsuitCardsInBoard || this.noShipCardsInBoard) {
      return [this.endGame()]
    }
    return [moveIfGameNotEnded]
  }

  checkInstantEndOfGame(moveIfGameNotEnded: MaterialMove[]): MaterialMove[] {
    if (
      this.checkIfAPlayerAs3MoreShips() ||
      this.checkIfAPlayerhasWin3Lawsuits() ||
      this.checkIfAPlayerhasThe4Alliances() ||
      this.checkIfPrestigeMarkerIsOnACity()
    ) {
      return [this.endGame()]
    }
    return moveIfGameNotEnded
  }

  checkIfWinnerIsDeterminateByScore(): boolean {
    return (
      !this.checkIfAPlayerAs3MoreShips() &&
      !this.checkIfAPlayerhasWin3Lawsuits() &&
      !this.checkIfAPlayerhasThe4Alliances() &&
      !this.checkIfPrestigeMarkerIsOnACity()
    )
  }

  rankPlayers(playerA: City, playerB: City): number {
    if (this.checkIfAPlayerAs3MoreShips()) {
      return this.getPlayerShipCards(playerB).length > this.getPlayerShipCards(playerA).length ? 1 : -1
    }
    if (this.checkIfAPlayerhasWin3Lawsuits()) {
      return this.getPlayerLawsuitCards(playerB).length > this.getPlayerLawsuitCards(playerA).length ? 1 : -1
    }
    if (this.checkIfAPlayerhasThe4Alliances()) {
      return this.getPlayerAllianceCards(playerB).length > this.getPlayerAllianceCards(playerA).length ? 1 : -1
    }
    if (this.checkIfPrestigeMarkerIsOnACity()) {
      return this.prestigeMarkerLocation === this.getPlayerPrestigeLocation(playerB) ? 1 : -1
    }

    return this.getScore(playerB) > this.getScore(playerA) ? 1 : this.getScore(playerB) < this.getScore(playerA) ? -1 : 0
  }

  getScore(playerId: City): number {
    let score = 0
    score += this.getPlayerAllianceCards(playerId)
      .getItems()
      .map((it) => alliancesData[it.id as Alliance].stars)
      .reduce((acc, cur) => acc + cur, 0)
    score += this.getPlayerLawsuitCards(playerId)
      .getItems()
      .map((it) => lawsuitData[it.id as Lawsuit].nbStars)
      .reduce((acc, cur) => acc + cur, 0)
    score += this.getPlayerShipCards(playerId)
      .getItems<Ship>()
      .map((it) => shipData[it.id].getNbStars(this.getPlayerShipCards(playerId).length))
      .reduce((acc, cur) => acc + cur, 0)
    score += this.material(MaterialType.StarToken).location(LocationType.PlayerStarTokens).player(playerId).getQuantity()
    if (playerId === City.Hamburg && this.prestigeMarkerLocation > 0) {
      score += this.prestigeMarkerStars
    }
    if (playerId === City.Altona && this.prestigeMarkerLocation < 0) {
      score += this.prestigeMarkerStars
    }
    return score
  }

  checkIfAPlayerAs3MoreShips(): boolean {
    const altonaShips = this.getPlayerShipCards(City.Altona)
    const hamburgShips = this.getPlayerShipCards(City.Hamburg)

    return Math.abs(altonaShips.length - hamburgShips.length) >= 3
  }

  checkIfAPlayerhasWin3Lawsuits(): boolean {
    const altonaLawsuits = this.getPlayerLawsuitCards(City.Altona)
    const hamburgLawsuits = this.getPlayerLawsuitCards(City.Hamburg)

    return altonaLawsuits.length >= 3 || hamburgLawsuits.length >= 3
  }

  checkIfAPlayerhasThe4Alliances(): boolean {
    const altonaAlliances = this.getPlayerAllianceCards(City.Altona)
    const hamburgAlliances = this.getPlayerAllianceCards(City.Hamburg)

    return altonaAlliances.length >= 4 || hamburgAlliances.length >= 4
  }

  checkIfPrestigeMarkerIsOnACity(): boolean {
    const prestigeMarkerLocation = this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste).getItem()?.location.x ?? 0
    return Math.abs(prestigeMarkerLocation) >= 8
  }

  private getPlayerPrestigeLocation(player: City) {
    return player === City.Altona ? -8 : 8
  }

  private getPlayerLawsuitCards(player: City) {
    return this.material(MaterialType.LawsuitCard).location(LocationType.PlayerLawsuitCards).player(player)
  }

  private getPlayerShipCards(player: City) {
    return this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(player)
  }

  private getPlayerAllianceCards(player: City) {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAlliances).player(player)
  }

  get prestigeMarkerLocation() {
    return this.material(MaterialType.PrestigeMarker).location(LocationType.PrestigeMarkerPiste).getItem()?.location.x ?? 0
  }

  get factoryDeckIsEmpty() {
    return this.material(MaterialType.Factory).location(LocationType.FactoryDeck).length === 0
  }

  get starTokensDeckIsEmpty() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck).length === 0
  }

  get noLawsuitCardsInBoard() {
    return (
      this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitDeck).length === 0 &&
      this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).length === 0
    )
  }

  get noShipCardsInBoard() {
    return (
      this.material(MaterialType.ShipCard).location(LocationType.ShipCardsDeck).length === 0 &&
      this.material(MaterialType.ShipCard).location(LocationType.ShipCardsRiver).length === 0
    )
  }

  get prestigeMarkerStars() {
    switch (Math.abs(this.prestigeMarkerLocation)) {
      case 2:
      case 3:
        return 1
      case 4:
      case 5:
        return 2
      case 6:
      case 7:
        return 4
      default:
        return 0
    }
  }
}
