import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { AdvanceLawsuitAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { Alliance } from '../../material/Alliance'
import { LawsuitCard, lawsuitCardData } from '../../material/LawsuitCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { AdvanceLawsuitHelper } from '../helper/AdvanceLawsuitHelper'
import { ActionRule } from './ActionRule'

export class AdvanceLawsuitActionRule extends ActionRule<AdvanceLawsuitAction> {
  advanceLawsuitHelper = new AdvanceLawsuitHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moveX = this.player === City.Altona ? -1 : 1
    const moves: MaterialMove[] = []
    this.possibleCardsToGet().forEach((card) => {
      const marker = this.material(MaterialType.LawsuitMarker).location(LocationType.LawsuitMarkerSpace).parent(card.location.parent)
      if (marker.length) {
        moves.push(marker.moveItem(({ location }) => ({ ...location, x: location.x! + moveX })))
      }
    })
    moves.push(this.customMove(CustomMoveType.Pass, this.action))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      const card = this.lawsuitCards.parent(move.location.parent).getItem()
      if (card) {
        lawsuitCardData[card.id as LawsuitCard].cost.forEach((cost) => {
          if (cost.type === 'Letter') {
            moves.push(...this.playerLetters.limit(cost.quantity).moveItems({ type: LocationType.LetterDeck }))
          } else {
            moves.push(...this.playerProducts.id(cost.type).moveItems({ type: LocationType.ProductPiles, id: cost.type }, cost.quantity))
          }
        })
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      const marker = this.material(MaterialType.LawsuitMarker).getItem(move.itemIndex)
      const card = this.lawsuitCards.parent(marker.location.parent).getItem()
      const lawsuitX = this.material(MaterialType.LawsuitPiece).getItem(marker.location.parent!).location.x!
      if (card) {
        const timeAlreadyAdvanced = this.action.nbTimeAlreadyAdvanced ?? 0

        if (
          this.hasLeHavreAlliance &&
          !this.action.isLeHavreBonus &&
          timeAlreadyAdvanced === 0 &&
          this.playerProducts.length &&
          this.possibleCardsToGet().length > 0
        ) {
          this.addActionBonus({
            type: ActionType.PayToPerformActionAgain,
            productType: undefined,
            price: 1,
            actionToPerformAgain: {
              type: ActionType.AdvanceLawsuit,
              nbTimeAlreadyAdvanced: 0,
              isLeHavreBonus: true
            }
          })
        }
        if (lawsuitX === 1 && timeAlreadyAdvanced < 1 && this.advanceLawsuitHelper.checkMarkerIsNotAtMaxX(marker)) {
          this.addActionBonus({
            type: ActionType.AdvanceLawsuit,
            lawsuitAdvancedLocation: marker.location.parent,
            nbTimeAlreadyAdvanced: timeAlreadyAdvanced + 1,
            isLeHavreBonus: this.action.isLeHavreBonus
          })
        } else if (lawsuitX === 2 && timeAlreadyAdvanced < 2 && this.advanceLawsuitHelper.checkMarkerIsNotAtMaxX(marker)) {
          this.addActionBonus({
            type: ActionType.AdvanceLawsuit,
            lawsuitAdvancedLocation: marker.location.parent,
            nbTimeAlreadyAdvanced: timeAlreadyAdvanced + 1,
            isLeHavreBonus: this.action.isLeHavreBonus
          })
        }
        if (timeAlreadyAdvanced === 0) {
          lawsuitCardData[card.id as LawsuitCard].actionInAdvance(this.game, this.player).forEach((action) => this.addActionBonus(action))
        }
        moves.push(this.endAction())
      }
    }
    return moves
  }

  possibleCardsToGet() {
    return this.lawsuitCards.getItems<LawsuitCard>((item) => this.advanceLawsuitHelper.checkIfCanAdvanceInLawsuit(item.id, item.location.parent!))
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get lawsuitCards() {
    if (this.action.lawsuitAdvancedLocation === undefined) {
      return this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace)
    }
    return this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitSpace).parent(this.action.lawsuitAdvancedLocation)
  }

  get hasLeHavreAlliance() {
    return this.material(MaterialType.AllianceCard).id(Alliance.LeHavre).getItem()?.location.player === this.player
  }
}
