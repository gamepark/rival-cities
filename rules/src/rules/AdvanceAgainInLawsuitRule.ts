import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../City'
import { LawsuitCard, lawsuitCardData } from '../material/LawsuitCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { AdvanceLawsuitActionRule } from './actions/AdvanceLawsuitActionRule'
import { NextRuleHelper } from './helper/NextRuleHelper'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class AdvanceAgainInLawsuitRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)
  advanceLawsuitHelper = new AdvanceLawsuitActionRule(this.game)

  onRuleStart(): MaterialMove[] {
    if (!this.advanceLawsuitHelper.checkIfCanAdvanceInLawsuit(this.lawsuitCardId)) {
      return [...this.nextRuleHelper.moveToNextRule()]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moveX = this.player === City.Altona ? -1 : 1
    const moves: MaterialMove[] = []

    const markerLocationX = this.marker.getItem()?.location.x ?? 0
    if (this.marker.length && markerLocationX < 4 && markerLocationX > -4) {
      moves.push(this.marker.moveItem(({ location }) => ({ ...location, x: location.x! + moveX })))
    }

    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      this.memorize(MemoryType.NbTimeAdvancedInLawsuit, (oldValue: number) => oldValue + 1)
      lawsuitCardData[this.lawsuitCardId].cost.forEach((cost) => {
        if (cost.type === 'Letter') {
          moves.push(...this.playerLetters.limit(cost.quantity).moveItems({ type: LocationType.LetterDeck }))
        } else {
          moves.push(...this.playerProducts.id(cost.type).moveItems({ type: LocationType.ProductPiles, id: cost.type }, cost.quantity))
        }
      })
      if (
        move.location.id === 1 ||
        this.remind(MemoryType.NbTimeAdvancedInLawsuit) === 2
      ) {
        this.forget(MemoryType.LawsuitAdvanced)
        this.memorize(MemoryType.NbTimeAdvancedInLawsuit, 0)
        moves.push(...this.nextRuleHelper.moveToNextRule())
      } else {
        moves.push(this.startRule(RuleId.AdvanceAgainInLawsuit))
      }
    }
    return moves
  }

  get lawsuitCardId(): LawsuitCard {
    const lawsuitAdvanced = this.remind(MemoryType.LawsuitAdvanced)
    return this.material(MaterialType.LawsuitCard)
      .location(LocationType.LawsuitCardsRiver)
      .filter(({ location }) => location.z === lawsuitAdvanced)
      .getItem()?.id
  }

  get marker() {
    const lawsuitAdvanced = this.remind(MemoryType.LawsuitAdvanced)
    return this.material(MaterialType.LawsuitMarker).location(LocationType.LawsuitMarkerPiste).locationId(lawsuitAdvanced)
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }
}
