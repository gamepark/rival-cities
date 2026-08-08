import { isDeleteItemType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { cloneDeep } from 'es-toolkit/compat'
import { City } from '../../City'
import { ResolveLawsuitAction } from '../../material/Action'
import { Lawsuit, lawsuitData } from '../../material/Lawsuit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Ship, shipData, ShipEffectType } from '../../material/Ship'
import { ActionRule } from './ActionRule'

export class ResolveLawsuitRule extends ActionRule<ResolveLawsuitAction> {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const firstLawsuit = this.material(MaterialType.LawsuitPiece).location((l) => l.x === 0)
    if (!firstLawsuit.length) {
      return [this.startNextRule()]
    }
    const firstLawsuitIndex = firstLawsuit.getIndex()
    const firstLawsuitMarker = this.material(MaterialType.LawsuitMarker).parent(firstLawsuitIndex)
    const firstLawsuitMarkerX = firstLawsuitMarker.getItem()!.location.x!
    const firstLawsuitCard = this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).parent(firstLawsuitIndex)
    const starTokens = this.material(MaterialType.StarToken).location(LocationType.StarTokenSupply)

    if (Math.abs(firstLawsuitMarkerX) === 1 && starTokens.length) {
      const player = firstLawsuitMarkerX < 0 ? City.Altona : City.Hamburg
      moves.push(starTokens.moveItem({ type: LocationType.PlayerStarTokens, player }, 1))
    }

    if (Math.abs(firstLawsuitMarkerX) >= 2) {
      const player = firstLawsuitMarkerX < 0 ? City.Altona : City.Hamburg
      moves.push(firstLawsuitCard.moveItem({ type: LocationType.PlayerLawsuitCards, player }))
    } else {
      moves.push(firstLawsuitCard.deleteItem())
    }

    const lawsuitDeck = this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitStack).deck()

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

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.LawsuitCard)(move)) {
      if (move.location.type === LocationType.PlayerLawsuitCards) {
        if (this.player !== move.location.player) {
          this.action.isRivalTurn = true
        }
        const lawsuit = this.material(MaterialType.LawsuitCard).getItem<Lawsuit>(move.itemIndex).id
        const actions = cloneDeep(lawsuitData[lawsuit].winBonus)
        const playerShips = this.material(MaterialType.ShipCard).player(move.location.player).getItems<Ship>()
        for (const ship of playerShips) {
          const effect = shipData[ship.id].effect
          if (effect?.type === ShipEffectType.WinLawsuitBonus) {
            actions.push(cloneDeep(effect.action))
          }
        }
        this.addActions(...actions)
      } else if (move.location.type === LocationType.LawsuitSpace) {
        return [this.startNextRule()]
      }
    } else if (isDeleteItemType(MaterialType.LawsuitPiece)(move)) {
      return [this.startNextRule()]
    }
    return []
  }
}
