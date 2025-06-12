import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { LawsuitCard, lawsuitCardData } from '../../material/LawsuitCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class AdvanceLawsuitActionRule extends PlayerTurnRule {
  nextRuleHelper = new NextRuleHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moveX = this.player === City.Altona ? -1 : 1
    const moves: MaterialMove[] = []
    this.possibleCardsToGet().forEach((card) => {
      const marker = this.material(MaterialType.LawsuitMarker).location(LocationType.LawsuitMarkerPiste).locationId(card.location.z)
      const markerLocationX = marker.getItem()?.location.x ?? 0
      if (marker.length && markerLocationX < 4 && markerLocationX > -4) {
        moves.push(marker.moveItem(({ location }) => ({ ...location, x: location.x! + moveX })))
      }
    })
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      if (!this.remind(MemoryType.BasicActionChoosen)) {
        this.memorize(MemoryType.BasicActionChoosen, ActionType.AdvanceLawsuit)
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      const card = this.lawsuitCards.filter(({ location }) => location.z === move.location.id).getItem()
      if (card) {
        lawsuitCardData[card.id as LawsuitCard].cost.forEach((cost) => {
          if (cost.type === 'Letter') {
            moves.push(...this.playerLetters.limit(cost.quantity).moveItems({ type: LocationType.LetterDeck }))
          } else {
            moves.push(...this.playerProducts.id(cost.type).moveItems({ type: LocationType.ProductPiles, id: cost.type }, cost.quantity))
          }
        })
        moves.push(...lawsuitCardData[card.id as LawsuitCard].actionInAdvance(this.game, this.player))
        if (move.location.id === 1 || move.location.id === 2) {
          this.memorize(MemoryType.LawsuitAdvanced, move.location.id)
          moves.push(this.startRule(RuleId.AdvanceAgainInLawsuit))
        } else {
          moves.push(...this.nextRuleHelper.moveToNextRule())
        }
      }
    }
    return moves
  }

  possibleCardsToGet() {
    return this.lawsuitCards.getItems((item) => this.checkIfCanAdvanceInLawsuit(item.id as LawsuitCard))
  }

  checkIfCanAdvanceInLawsuit(itemId: LawsuitCard) {
    const lawsuitData = lawsuitCardData[itemId]
    let haveSuffisantProducts = true
    lawsuitData.cost.forEach((cost) => {
      if (cost.type === 'Letter') {
        if (this.playerLetters.length < cost.quantity) {
          haveSuffisantProducts = false
        }
      } else {
        if (this.playerProducts.id(cost.type).getQuantity() < cost.quantity) {
          haveSuffisantProducts = false
        }
      }
    })
    return haveSuffisantProducts
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get lawsuitCards() {
    return this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitCardsRiver)
  }
}
