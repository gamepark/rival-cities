import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../City'
import { LawsuitCard, lawsuitCardData } from '../../material/LawsuitCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { CustomMoveType } from '../CustomMoveType'
import { AllianceCard } from '../../material/AllianceCard'
import { BasicActionHelper } from '../helper/BasicActionHelper'
import { AllianceCardHelper } from '../../material/helper/AllianceCardHelper'

export class AdvanceLawsuitActionRule extends PlayerTurnRule {
  actionType = ActionType.AdvanceLawsuit
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.NbTimeUsedAllianceLeHavre, 0)
    if(this.possibleCardsToGet().length === 0) {
      return this.computedActionHelper.removeActionAndWait(this.actionType)
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
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
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
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
        this.memorize(MemoryType.BasicActionChoosen, ActionType.AdvanceLawsuit)
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LawsuitMarker)(move)) {
      const card = this.lawsuitCards.filter(({ location }) => location.z === move.location.id).getItem()
      if (card) {
        moves.push(...lawsuitCardData[card.id as LawsuitCard].actionInAdvance(this.game, this.player))
        const playerHaveAllianceLeHavre = new AllianceCardHelper(this.game).checkPlayerAllianceCardById(AllianceCard.AllianceLeHavre)
        if (move.location.id === 1 || move.location.id === 2) {
          this.memorize(MemoryType.LawsuitAdvanced, move.location.id)
          moves.push(this.startRule(RuleId.AdvanceAgainInLawsuit))
        } else if (playerHaveAllianceLeHavre && this.playerProducts.length) {
          moves.push(this.startRule(RuleId.AllianceCardAdvanceAgainInLawsuit))
        } else {
          this.forget(MemoryType.BasicActionChoosen)
          moves.push(...this.computedActionHelper.removeActionAndWait(this.actionType))
        }
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
      if(isCustomMoveType(CustomMoveType.Wait)(move)) {
        this.forget(MemoryType.BasicActionChoosen)
      }
      return []
  }

  possibleCardsToGet() {
    return this.lawsuitCards.getItems((item) => this.checkIfCanAdvanceInLawsuit(item.id as LawsuitCard))
  }

  checkIfCanAdvanceInLawsuit(itemId: LawsuitCard) {
    if(!itemId) return false
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
