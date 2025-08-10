import { getEnumValues, isMoveItemType, ItemMove, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { ActionType, AdvanceLawsuit } from '../../material/Action'
import { Alliance } from '../../material/Alliance'
import { CostType } from '../../material/Cost'
import { Lawsuit, lawsuitData } from '../../material/Lawsuit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Product } from '../../material/Product'
import { CustomMoveType } from '../CustomMoveType'
import { ActionRule } from './ActionRule'

export class AdvanceLawsuitRule extends ActionRule<AdvanceLawsuit> {
  getPlayerMoves(): MaterialMove[] {
    const moveX = this.player === City.Altona ? -1 : 1
    const moves: MaterialMove[] = []
    this.possibleCardsToGet().forEach((card) => {
      const marker = this.material(MaterialType.LawsuitMarker).location(LocationType.LawsuitMarkerSpace).parent(card.location.parent)
      if (marker.length) {
        moves.push(marker.moveItem(({ location }) => ({ ...location, x: location.x! + moveX })))
      }
    })
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      const card = this.lawsuitCards.parent(move.location.parent).getItem<Lawsuit>()!
      const cost = lawsuitData[card.id].cost
      switch (cost.type) {
        case CostType.Product:
          moves.push(this.playerProducts.id(cost.product).moveItem({ type: LocationType.ProductPiles, id: cost.product }, cost.amount))
          break
        case CostType.Products:
          for (const product of getEnumValues(Product)) {
            const amount = cost.amount[product]
            if (amount) {
              moves.push(this.playerProducts.id(product).moveItem({ type: LocationType.ProductPiles, id: product }, amount))
            }
          }
          break
        case CostType.Letters:
          moves.push(this.playerLetters.moveItem({ type: LocationType.LetterDeck }, 1))
          break
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
          this.addActions({
            type: ActionType.PayToPerformActionAgain,
            price: 1,
            actionToPerformAgain: {
              type: ActionType.AdvanceLawsuit,
              nbTimeAlreadyAdvanced: 0,
              isLeHavreBonus: true
            }
          })
        }
        if (lawsuitX === 1 && timeAlreadyAdvanced < 1 && this.checkMarkerIsNotAtMaxX(marker)) {
          this.addActions({
            type: ActionType.AdvanceLawsuit,
            lawsuitAdvancedLocation: marker.location.parent,
            nbTimeAlreadyAdvanced: timeAlreadyAdvanced + 1,
            isLeHavreBonus: this.action.isLeHavreBonus
          })
        } else if (lawsuitX === 2 && timeAlreadyAdvanced < 2 && this.checkMarkerIsNotAtMaxX(marker)) {
          this.addActions({
            type: ActionType.AdvanceLawsuit,
            lawsuitAdvancedLocation: marker.location.parent,
            nbTimeAlreadyAdvanced: timeAlreadyAdvanced + 1,
            isLeHavreBonus: this.action.isLeHavreBonus
          })
        }
        if (timeAlreadyAdvanced === 0) {
          for (const action of lawsuitData[card.id as Lawsuit].advanceBonus) {
            this.addActions(structuredClone(action))
          }
        }
        moves.push(this.endAction())
      }
    }
    return moves
  }

  possibleCardsToGet() {
    return this.lawsuitCards.getItems<Lawsuit>((item) => this.checkIfCanAdvanceInLawsuit(item.id, item.location.parent!))
  }

  checkIfCanAdvanceInLawsuit(itemId: Lawsuit, parent: number) {
    if (!itemId) return false
    const cost = lawsuitData[itemId].cost
    const marker = this.material(MaterialType.LawsuitMarker).location(LocationType.LawsuitMarkerSpace).parent(parent)
    return this.canPay(cost) && this.checkMarkerIsNotAtMaxX(marker.getItem()!)
  }

  checkMarkerIsNotAtMaxX(marker: MaterialItem): boolean {
    const markerLocationX = marker.location.x ?? 0
    if (this.player === City.Altona) {
      return markerLocationX > -4
    }
    return markerLocationX < 4
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
