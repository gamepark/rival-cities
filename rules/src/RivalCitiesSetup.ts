import { MaterialGameSetup } from '@gamepark/rules-api'
import shuffle from 'lodash/shuffle'
import { City } from './City'
import { basicActionCardPlaces, specialActionCardPlaces } from './constantes'
import { allianceCards } from './material/Alliance'
import { basicActionCards } from './material/BasicActionCard'
import { lawsuitCards } from './material/LawsuitCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Product, products } from './material/Product'
import { shipCards } from './material/ShipCard'
import { specialActionCards } from './material/SpecialActionCard'
import { RivalCitiesOptions } from './RivalCitiesOptions'
import { RivalCitiesRules } from './RivalCitiesRules'
import { MemoryType } from './rules/MemoryType'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class RivalCitiesSetup extends MaterialGameSetup<City, MaterialType, LocationType, RivalCitiesOptions> {
  Rules = RivalCitiesRules

  setupMaterial(options: RivalCitiesOptions) {
    this.material(MaterialType.BellToken).createItem({ location: { type: LocationType.BellTokenIdle } })
    this.material(MaterialType.InkJar).createItem({ location: { type: LocationType.InkJarPiste, id: 0 } })
    this.material(MaterialType.PrestigeMarker).createItem({ location: { type: LocationType.PrestigeMarkerPiste, x: 0 } })
    this.material(MaterialType.Letter).createItem({ quantity: 12, location: { type: LocationType.LetterDeck } })
    this.material(MaterialType.Factory).createItem({ quantity: 12, location: { type: LocationType.FactoryDeck } })
    this.material(MaterialType.StarToken).createItem({ quantity: 12, location: { type: LocationType.StarTokenDeck } })

    const basicCards = options.firstPlay ? basicActionCards : shuffle(basicActionCards)
    basicActionCardPlaces.forEach((id, index) => {
      this.material(MaterialType.BasicActionCard).createItem({ id: basicCards[index], location: { type: LocationType.CardPiste, id } })
    })

    this.setupSpecialActionCards()
    this.setupShipCards()
    this.setupAllianceCards()
    this.setupLawsuits()
    this.setupProducts()
    this.setupPlayers()
    this.initializeMemory()
  }

  setupSpecialActionCards() {
    const specialActionCardsItems = shuffle(specialActionCards).map((it) => ({ id: it, location: { type: LocationType.SpecialActionCardsDeck } }))
    this.material(MaterialType.SpecialActionCard).createItems(specialActionCardsItems)
    specialActionCardPlaces.forEach((id) => {
      this.material(MaterialType.SpecialActionCard).location(LocationType.SpecialActionCardsDeck).moveItem({
        type: LocationType.CardPiste,
        id
      })
    })
  }

  setupShipCards() {
    const shipCardsItems = shuffle(shipCards)
      .slice(0, 10)
      .map((it) => ({ id: it, location: { type: LocationType.ShipCardsDeck } }))
    this.material(MaterialType.ShipCard).createItems(shipCardsItems)
    this.material(MaterialType.ShipCard).location(LocationType.ShipCardsDeck).limit(4).moveItems({
      type: LocationType.ShipCardsRiver
    })
  }

  setupAllianceCards() {
    const allianceCardItems = shuffle(allianceCards)
      .slice(0, 4)
      .map((it, index) => ({ id: it, location: { type: LocationType.AllianceSpace, x: index } }))
    this.material(MaterialType.AllianceCard).createItems(allianceCardItems)
  }

  setupLawsuits() {
    this.setupLawsuitDeck()
    for (let i = 0; i < 3; i++) {
      this.material(MaterialType.LawsuitPiece).createItem({ location: { type: LocationType.LawsuitPieceSpot } })
    }
    for (const index of this.material(MaterialType.LawsuitPiece).getIndexes()) {
      this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitDeck).moveItem({ type: LocationType.LawsuitSpace, parent: index })
      this.material(MaterialType.LawsuitMarker).createItem({ location: { type: LocationType.LawsuitMarkerSpace, parent: index, x: 0 } })
    }
  }

  setupLawsuitDeck() {
    const lawsuitCardItems = shuffle(lawsuitCards)
      .slice(0, 7)
      .map((it) => ({ id: it, location: { type: LocationType.LawsuitDeck } }))
    this.material(MaterialType.LawsuitCard).createItems(lawsuitCardItems)
  }

  setupProducts() {
    products.forEach((product) => {
      this.material(MaterialType.Product).createItem({
        id: product,
        location: { type: LocationType.ProductPiles, id: product },
        quantity: 12
      })
    })
  }

  setupPlayers() {
    this.players.forEach((player, index) => {
      this.material(MaterialType.Factory).moveItem({ type: LocationType.PlayerFactories, player })
      this.material(MaterialType.Product)
        .id(Product.Beer)
        .moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }, index + 1)
    })
  }

  start() {
    this.startSimultaneousRule(RuleId.ChooseFirstProduct)
  }

  private initializeMemory() {
    this.memorize(MemoryType.Count, 0)
    this.memorize(MemoryType.CounterActions, 0)
    this.memorize(MemoryType.IsBuildInProgress, false)
    this.memorize(MemoryType.IsProductReturn, false)
    this.memorize(MemoryType.Actions, [])
  }
}
