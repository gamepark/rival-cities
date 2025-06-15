import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../City'
import { LawsuitCard, lawsuitCardData } from '../material/LawsuitCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class ResolveLawsuitRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.MovesOnLawsuitWin, undefined)
    const moves: MaterialMove[] = []
    if(Math.abs(this.lawsuitMarkerToResolve) === 1) {
      const player = this.lawsuitMarkerToResolve < 0 ? City.Altona : City.Hamburg
      if(this.starTokens.length) {
        moves.push(this.starTokens.moveItem({ type: LocationType.PlayerStarTokens, player }))
      }
    }
    if(Math.abs(this.lawsuitMarkerToResolve) >= 2) {
      const player = this.lawsuitMarkerToResolve < 0 ? City.Altona : City.Hamburg
      moves.push(this.lawsuitCardToResolve.moveItem({ type: LocationType.PlayerLawsuitCards, player }))
      const lawsuitData = lawsuitCardData[this.lawsuitCardToResolve.getItem()?.id! as LawsuitCard]
      this.memorize(MemoryType.NextRules, [RuleId.OffSeasonChangeSpecialCards])
      this.memorize(MemoryType.MovesOnLawsuitWin, lawsuitData.actionInWin(this.game, player))
    } else {
      moves.push(this.lawsuitCardToResolve.deleteItem())
    }
    moves.push(
      this.material(MaterialType.LawsuitCard)
        .location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 1)
        .moveItem(({ location }) => ({ ...location, z: 0 }))
    )
    moves.push(
      this.material(MaterialType.LawsuitCard)
        .location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 2)
        .moveItem(({ location }) => ({ ...location, z: 1 }))
    )
    moves.push(
      this.material(MaterialType.LawsuitCard)
        .location(LocationType.LawsuitCardDeck)
        .maxBy((it) => it.location.x!)
        .moveItem({ type: LocationType.LawsuitCardsRiver, z: 2 })
    )
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

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItemType(MaterialType.LawsuitMarker)(move) && move.location.id === 2) {
      if(this.remind<MaterialMove[]>(MemoryType.MovesOnLawsuitWin)) {
        return this.remind(MemoryType.MovesOnLawsuitWin)
      }
      return [this.startRule(RuleId.OffSeasonChangeSpecialCards)]
    }
    return []
  }

  get lawsuitMarkerToResolve() {
    return this.material(MaterialType.LawsuitMarker).location((loc) => loc.type === LocationType.LawsuitMarkerPiste && loc.id === 0).getItem()?.location.x!
  }

  get lawsuitCardToResolve() {
    return this.material(MaterialType.LawsuitCard).location((loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === 0)
  }

  get starTokens() {
    return this.material(MaterialType.StarToken).location(LocationType.StarTokenDeck)
  }
}
