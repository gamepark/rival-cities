import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ActionType } from '../ActionType'
import { ComputedActionsHelper } from '../helper/ComputedActionsHelper'
import { MemoryType } from '../MemoryType'
import { AllianceCard } from '../../material/AllianceCard'
import { Product } from '../../material/Product'
import { RuleId } from '../RuleId'
import { BasicActionHelper } from '../helper/BasicActionHelper'

export class DrawSpecialActionCardActionRule extends PlayerTurnRule {
  actionType = ActionType.DrawSpecialActionCard
  computedActionHelper = new ComputedActionsHelper(this.game)
  basicActionHelper = new BasicActionHelper(this.game)
  nbCardsToDraw = 1

  onRuleStart(): MaterialMove[] {
    return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      this.memorize(MemoryType.BasicActionChoosen, ActionType.DrawSpecialActionCard)
      this.memorize<number>(MemoryType.NbCardsDraw, (old) => old + 1)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(this.basicActionHelper.checkAnotherActionInProgress(this.actionType)) return []
    if (isMoveItemType(MaterialType.SpecialActionCard)(move)) {
      if(this.remind(MemoryType.NbCardsDraw) === this.nbCardsToDraw) {
        this.memorize(MemoryType.NbCardsDraw, 0)
        if(this.playerAllianceKjobenhavn.length && this.playerBeers.getQuantity() > 0) {
          return [this.startRule(RuleId.AllianceCardDrawSpecialActionCardAgain)]
        }
        this.forget(MemoryType.BasicActionChoosen)
        return this.computedActionHelper.removeActionAndWait(this.actionType)
      }
    }
    return [this.specialActionCard.moveItem({ type: LocationType.PlayerSpecialActionCardsHand, player: this.player })]
  }

  get specialActionCard() {
    return this.material(MaterialType.SpecialActionCard)
      .location(LocationType.SpecialActionCardsDeck)
      .maxBy((it) => it.location.x!)
  }
  
    get playerBeers() {
      return this.material(MaterialType.Product).id(Product.Beer).location(LocationType.PlayerProducts).player(this.player)
    }
  
  get playerAllianceKjobenhavn() {
    return this.material(MaterialType.AllianceCard).location(LocationType.PlayerAllianceCards).player(this.player).id(AllianceCard.AllianceKjjobenhavn)
  }
}
