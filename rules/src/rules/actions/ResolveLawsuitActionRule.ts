import { isDeleteItemType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { Action, ResolveLawsuitAction } from '../../material/Actions/Actions'
import { LawsuitCard, lawsuitCardData } from '../../material/LawsuitCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ShipCard } from '../../material/ShipCard'
import { ActionRuleIds } from '../helper/ActionRuleIds'
import { EndOfGameHelper } from '../helper/EndOfGameHelper'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

export class ResolveLawsuitActionRule extends ActionRule<ResolveLawsuitAction> {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const firstLawsuit = this.material(MaterialType.LawsuitPiece).location((l) => l.x === 0)
    const firstLawsuitIndex = firstLawsuit.getIndex()
    const firstLawsuitMarker = this.material(MaterialType.LawsuitMarker).parent(firstLawsuitIndex)
    const firstLawsuitMarkerX = firstLawsuitMarker.getItem()!.location.x!
    const firstLawsuitCard = this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).parent(firstLawsuitIndex)
    const starTokens = this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)

    if (Math.abs(firstLawsuitMarkerX) === 1 && starTokens.length) {
      const player = firstLawsuitMarkerX < 0 ? City.Altona : City.Hamburg
      moves.push(starTokens.moveItem({ type: LocationType.PlayerStarTokens, player }))
    }

    if (Math.abs(firstLawsuitMarkerX) >= 2) {
      const player = firstLawsuitMarkerX < 0 ? City.Altona : City.Hamburg
      moves.push(firstLawsuitCard.moveItem({ type: LocationType.PlayerLawsuitCards, player }))
    } else {
      moves.push(firstLawsuitCard.deleteItem())
    }

    const lawsuitDeck = this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitDeck).deck()

    if (lawsuitDeck.length) {
      if (firstLawsuitMarkerX !== 0) {
        moves.push(firstLawsuitMarker.moveItem((item) => ({ ...item.location, x: 0 })))
      }
      moves.push(firstLawsuit.moveItem({ type: LocationType.LawsuitPieceSpot }))
      moves.push(lawsuitDeck.dealOne({ type: LocationType.LawsuitSpace, parent: firstLawsuitIndex }))
    } else {
      moves.push(firstLawsuitMarker.deleteItem())
      moves.push(firstLawsuit.deleteItem())
    }

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
    if (isMoveItemType(MaterialType.LawsuitCard)(move)) {
      if (move.location.type === LocationType.PlayerLawsuitCards) {
        return new EndOfGameHelper(this.game).checkInstantEndOfGame(this.getMoveOnLawsuitWin(move))
      } else if (move.location.type === LocationType.LawsuitSpace) {
        return this.removeActionAndMove()
      }
    } else if (isDeleteItemType(MaterialType.LawsuitPiece)(move)) {
      return this.removeActionAndMove()
    }
    return []
  }

  getMoveOnLawsuitWin(move: MaterialMove) {
    if (!isMoveItemType(MaterialType.LawsuitCard)(move)) return []
    if (this.remind(MemoryType.OffSeasonStep)) {
      this.memorize(MemoryType.OffSeasonStep, RuleId.OffSeasonChangeSpecialCards)
    }
    const cardId = this.material(MaterialType.LawsuitCard).getItem(move.itemIndex).id as LawsuitCard
    const lawsuitData = lawsuitCardData[cardId]
    this.memorize(MemoryType.Actions, lawsuitData.actionInWin(this.game, move.location.player!))
    return [this.startRule(ActionRuleIds[this.remind<Action[]>(MemoryType.Actions)[0].type])]
  }
}
