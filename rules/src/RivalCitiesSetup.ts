import { MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { City } from './City'
import { allianceCards } from './material/AllianceCard'
import { basicActionCards } from './material/BasicActionCard'
import { lawsuitCards } from './material/LawsuitCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Product, products } from './material/Product'
import { shipCards } from './material/ShipCard'
import { specialActionCards } from './material/SpecialActionCard'
import { RivalCitiesOptions } from './RivalCitiesOptions'
import { RivalCitiesRules } from './RivalCitiesRules'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class RivalCitiesSetup extends MaterialGameSetup<City, MaterialType, LocationType, RivalCitiesOptions> {
  Rules = RivalCitiesRules

  setupMaterial(_options: RivalCitiesOptions) {
    this.material(MaterialType.BellToken).createItem({ location: { type: LocationType.BellTokenIdle } })
    this.material(MaterialType.InkJar).createItem({ location: { type: LocationType.InkJarPiste, id: 0 } })
    this.material(MaterialType.PrestigeMarker).createItem({ location: { type: LocationType.PrestigeMarkerPiste, x: 0 } })
    this.material(MaterialType.Letter).createItem({ quantity: 12, location: { type: LocationType.LetterDeck } })
    this.material(MaterialType.Factory).createItem({ quantity: 12, location: { type: LocationType.FactoryDeck } })
    this.material(MaterialType.StarToken).createItem({ quantity: 12, location: { type: LocationType.StarTokenDeck } })

    basicActionCardPlaces.forEach((id, index) => {
      this.material(MaterialType.BasicActionCard).createItem({ id: basicActionCards[index], location: { type: LocationType.CardPiste, id } })
    })

    this.setupSpecialActionCards()
    this.setupShipCards()
    this.setupAllianceCards()
    this.setupLawsuitCards()
    this.setupProducts()
    this.setupPlayers()
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
      .map((it) => ({ id: it, location: { type: LocationType.AllianceCardsLayout } }))
    this.material(MaterialType.AllianceCard).createItems(allianceCardItems)
  }

  setupLawsuitCards() {
    const lawsuitCardItems = shuffle(lawsuitCards)
      .slice(0, 7)
      .map((it) => ({ id: it, location: { type: LocationType.LawsuitCardDeck } }))
    this.material(MaterialType.LawsuitCard).createItems(lawsuitCardItems)
    this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitCardDeck).limit(3).moveItems({
      type: LocationType.LawsuitCardsRiver
    })
    for (let i = 0; i < 3; i++) {
      this.material(MaterialType.LawsuitMarker).createItem({ location: { type: LocationType.LawsuitMarkerPiste, id: i, x: 0 } })
    }
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
      this.material(MaterialType.Product).id(Product.Beer).moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }, index + 1)
    })
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}

const basicActionCardPlaces = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19]
const specialActionCardPlaces = [4, 8, 12, 16]
