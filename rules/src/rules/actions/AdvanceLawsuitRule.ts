import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { ActionType, AdvanceLawsuit } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { Lawsuit, lawsuitData } from '../../material/Lawsuit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { AdvanceLawsuitHelper } from '../helper/AdvanceLawsuitHelper'
import { ActionRule } from './ActionRule'

export class AdvanceLawsuitRule extends ActionRule<AdvanceLawsuit> {
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
        lawsuitData[card.id as Lawsuit].cost.forEach((cost) => {
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
          this.hasAlliance(Alliance.LeHavre) &&
          !this.action.isLeHavreBonus &&
          timeAlreadyAdvanced === 0 &&
          this.playerProducts.length &&
          this.possibleCardsToGet().length > 0
        ) {
          this.addActionBonus({
            type: ActionType.PayToPerformActionAgain,
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
          for (const action of lawsuitData[card.id as Lawsuit].advanceBonus) {
            this.addActionBonus(JSON.parse(JSON.stringify(action)))
          }
        }
        moves.push(this.endAction())
      }
    }
    return moves
  }

  possibleCardsToGet() {
    return this.lawsuitCards.getItems<Lawsuit>((item) => this.advanceLawsuitHelper.checkIfCanAdvanceInLawsuit(item.id, item.location.parent!))
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
}
