import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { Action, ResolveLawsuitAction } from '../../material/Actions/Actions'
import { LawsuitCard, lawsuitCardData } from '../../material/LawsuitCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard } from '../../material/ShipCard'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'
import { MemoryType } from '../MemoryType'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'

export class ResolveLawsuitActionRule extends ActionRule<ResolveLawsuitAction> {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (Math.abs(this.lawsuitMarkerToResolve) === 1) {
      const player = this.lawsuitMarkerToResolve < 0 ? City.Altona : City.Hamburg
      if (this.starTokens.length) {
        moves.push(this.starTokens.moveItem({ type: LocationType.PlayerStarTokens, player }))
      }
    }
    if (Math.abs(this.lawsuitMarkerToResolve) >= 2) {
      const player = this.lawsuitMarkerToResolve < 0 ? City.Altona : City.Hamburg
      moves.push(this.lawsuitCardToResolve.moveItem({ type: LocationType.PlayerLawsuitCards, player }))
    } else {
      moves.push(this.lawsuitCardToResolve.deleteItem())
    }
    if (this.material(MaterialType.LawsuitCard).location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 1).length) {
      moves.push(
        this.material(MaterialType.LawsuitCard)
          .location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 1)
          .moveItem(({ location }) => ({ ...location, z: 0 }))
      )
    }
    if (this.material(MaterialType.LawsuitCard).location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 2).length) {
      moves.push(
        this.material(MaterialType.LawsuitCard)
          .location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 2)
          .moveItem(({ location }) => ({ ...location, z: 1 }))
      )
    }
    if (this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitCardDeck).length) {
      moves.push(
        this.material(MaterialType.LawsuitCard)
          .location(LocationType.LawsuitCardDeck)
          .maxBy((it) => it.location.x!)
          .moveItem({ type: LocationType.LawsuitCardsRiver, z: 2 })
      )
    }
    moves.push(
      this.material(MaterialType.LawsuitMarker)
        .location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === 1)
        .moveItem(({ location }) => ({ ...location, id: 0 }))
    )
    moves.push(
      this.material(MaterialType.LawsuitMarker)
        .location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === 2)
        .moveItem(({ location }) => ({ ...location, id: 1 }))
    )
    moves.push(
      this.material(MaterialType.LawsuitMarker)
        .location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === 0)
        .moveItem(({ location }) => ({ ...location, id: 2, x: 0 }))
    )
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.LawsuitCard)(move) && move.location.type === LocationType.PlayerLawsuitCards) {
      const playerShip15 = this.material(MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(move.location.player).id(ShipCard.Ship15)
      if (playerShip15.length > 0) {
        return [
          ...this.material(MaterialType.StarToken)
            .location(LocationType.StarTokenDeck)
            .moveItems({ type: LocationType.PlayerStarTokens, player: move.location.player }, 2)
        ]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.LawsuitMarker)(move) && move.location.id === 2) {
      return this.removeActionAndMove()
    }
    if (isMoveItemType(MaterialType.LawsuitCard)(move) && move.location.type === LocationType.PlayerLawsuitCards) {
      return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.getMoveOnLawsuitWin(move))
    }
    return []
  }

  getMoveOnLawsuitWin(move: MaterialMove) {
    if (!isMoveItemType(MaterialType.LawsuitCard)(move)) return []
    this.memorize(MemoryType.OffSeasonStep, RuleId.OffSeasonChangeSpecialCards)
    const cardId = this.material(MaterialType.LawsuitCard).getItem(move.itemIndex).id as LawsuitCard
    const lawsuitData = lawsuitCardData[cardId]
    this.memorize(MemoryType.Actions, lawsuitData.actionInWin(this.game, move.location.player!))
    return [this.startRule(ActionRuleIds[this.remind<Action[]>(MemoryType.Actions)[0].type])];
  }

  get lawsuitMarkerToResolve() {
    return this.material(MaterialType.LawsuitMarker)
      .location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === 0)
      .getItem()?.location.x!
  }

  get lawsuitCardToResolve() {
    return this.material(MaterialType.LawsuitCard).location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 0)
  }

  get starTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }
}
