import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { City } from '../../City'
import { AdvanceLawsuitAction } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { AllianceCard } from '../../material/AllianceCard'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'
import { LawsuitCard, lawsuitCardData } from '../../material/LawsuitCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { AdvanceLawsuitHelper } from '../helper/AdvanceLawsuitHelper'
import { MemoryType } from '../MemoryType'
import { ActionRule } from './ActionRule'

export class AdvanceLawsuitActionRule extends ActionRule<AdvanceLawsuitAction> {
  advanceLawsuitHelper = new AdvanceLawsuitHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moveX = this.player === City.Altona ? -1 : 1
    const moves: MaterialMove[] = []
    this.possibleCardsToGet().forEach((card) => {
      const marker = this.material(MaterialType.LawsuitMarker).location(LocationType.LawsuitMarkerPiste).locationId(card.location.z)
      const markerLocationX = marker.getItem()?.location.x ?? 0
      if (marker.length && markerLocationX < 4 && markerLocationX > -4) {
        moves.push(marker.moveItem(({ location }) => ({ ...location, x: location.x! + moveX })))
      }
    })

    moves.push(...this.playerLetters.moveItems({ type: LocationType.LetterDeck }))
    moves.push(this.customMove(CustomMoveType.Pass, this.action?.type))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
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
      }
      if (!this.remind(MemoryType.BasicActionChoosen)) {
        this.memorize(MemoryType.BasicActionChoosen, this.action?.type)
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Letter)(move) && !this.remind(MemoryType.BasicActionChoosen)) {
      return this.addActionBonusAndMove({ type: ActionType.ProductSwap, nbPossibleSwaps: 1 })
    }
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      this.removeAction()
      const card = this.lawsuitCards.filter(({ location }) => location.z === move.location.id).getItem()
      if (card) {
        const playerHaveAllianceLeHavre = new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceLeHavre)
        if (playerHaveAllianceLeHavre && this.playerProducts.length) {
          this.addActionBonus({
            type: ActionType.AdvanceLawsuit,
            nbTimeAlreadyAdvanced: 0,
            playerCanUseAllianceLeHavre: false
          })
        }
        if (move.location.id === 1 && this.nbTimeAlreadyAdvanced < 1) {
          this.addActionBonus({
            type: ActionType.AdvanceLawsuit,
            lawsuitAdvancedLocation: move.location.id,
            nbTimeAlreadyAdvanced: this.nbTimeAlreadyAdvanced + 1,
            playerCanUseAllianceLeHavre: false
          })
        } else if (move.location.id === 2 && this.nbTimeAlreadyAdvanced < 2) {
          this.addActionBonus({
            type: ActionType.AdvanceLawsuit,
            lawsuitAdvancedLocation: move.location.id,
            nbTimeAlreadyAdvanced: this.nbTimeAlreadyAdvanced + 1,
            playerCanUseAllianceLeHavre: false
          })
        }
        if (this.nbTimeAlreadyAdvanced === 0) {
          lawsuitCardData[card.id as LawsuitCard].actionInAdvance(this.game, this.player).forEach((action) => this.addActionBonus(action))
        }
        moves.push(...this.moveToNextAction())
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (this.checkAnotherActionInProgress(this.action?.type)) return []
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return this.removeActionAndMove()
    }
    return []
  }

  possibleCardsToGet() {
    return this.lawsuitCards.getItems((item) => this.advanceLawsuitHelper.checkIfCanAdvanceInLawsuit(item.id as LawsuitCard))
  }

  get playerProducts() {
    return this.material(MaterialType.Product).location(LocationType.PlayerProducts).player(this.player)
  }

  get playerLetters() {
    return this.material(MaterialType.Letter).location(LocationType.PlayerLetterDeck).player(this.player)
  }

  get lawsuitCards() {
    if (!this.action?.lawsuitAdvancedLocation) {
      return this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitCardsRiver)
    }
    return this.material(MaterialType.LawsuitCard).location(
      (loc) => loc.type === LocationType.LawsuitCardsRiver && loc.z === this.action?.lawsuitAdvancedLocation
    )
  }

  get nbTimeAlreadyAdvanced() {
    return this.action?.nbTimeAlreadyAdvanced ?? 0
  }
}
