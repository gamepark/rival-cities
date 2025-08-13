import { getEnumValues, MaterialGameSetup } from '@gamepark/rules-api'
import shuffle from 'lodash/shuffle'
import { City } from './City'
import { basicActionCardPlaces, specialActionCardPlaces } from './constantes'
import { allianceCards } from './material/Alliance'
import { BasicAction } from './material/BasicAction'
import { Lawsuit } from './material/Lawsuit'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Product, products } from './material/Product'
import { Ship } from './material/Ship'
import { SpecialAction } from './material/SpecialAction'
import { RivalCitiesOptions } from './RivalCitiesOptions'
import { RivalCitiesRules } from './RivalCitiesRules'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class RivalCitiesSetup extends MaterialGameSetup<City, MaterialType, LocationType, RivalCitiesOptions> {
  Rules = RivalCitiesRules

  setupMaterial(options: RivalCitiesOptions) {
    this.material(MaterialType.BellToken).createItem({ location: { type: LocationType.BellTokenSpot } })
    this.material(MaterialType.InkJar).createItem({ location: { type: LocationType.InkSpace, id: 0 } })
    this.material(MaterialType.PrestigeMarker).createItem({ location: { type: LocationType.PrestigeTrack, x: 0 } })
    this.material(MaterialType.Letter).createItem({ quantity: 12, location: { type: LocationType.LetterSupply } })
    this.material(MaterialType.Factory).createItem({ quantity: 12, location: { type: LocationType.FactorySupply } })
    this.material(MaterialType.StarToken).createItem({ quantity: 12, location: { type: LocationType.StarTokenSupply } })

    const cardsPlace = options.firstPlay ? basicActionCardPlaces : shuffle(basicActionCardPlaces)
    this.material(MaterialType.BasicActionCard).createItems(
      getEnumValues(BasicAction).map((basicAction, index) => ({ id: basicAction, location: { type: LocationType.ActionCardSpace, id: cardsPlace[index] } }))
    )

    this.setupSpecialActionCards()
    this.setupShipCards()
    this.setupAllianceCards()
    this.setupLawsuits()
    this.setupProducts()
    this.setupPlayers()
  }

  setupSpecialActionCards() {
    const specialActionCardsItems = shuffle(getEnumValues(SpecialAction)).map((it) => ({ id: it, location: { type: LocationType.ActionStack } }))
    this.material(MaterialType.SpecialActionCard).createItems(specialActionCardsItems)
    specialActionCardPlaces.forEach((id) => {
      this.material(MaterialType.SpecialActionCard).location(LocationType.ActionStack).moveItem({
        type: LocationType.ActionCardSpace,
        id
      })
    })
  }

  setupShipCards() {
    const ships = shuffle(getEnumValues(Ship)).slice(0, 10)
    this.material(MaterialType.ShipCard).createItems(ships.map((ship) => ({ id: ship, location: { type: LocationType.ShipStack } })))
    this.material(MaterialType.ShipCard).location(LocationType.ShipStack).limit(4).moveItems({ type: LocationType.ShipSpace })
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
      this.material(MaterialType.LawsuitCard).location(LocationType.LawsuitStack).moveItem({ type: LocationType.LawsuitSpace, parent: index })
      this.material(MaterialType.LawsuitMarker).createItem({ location: { type: LocationType.LawsuitMarkerSpace, parent: index, x: 0 } })
    }
  }

  setupLawsuitDeck() {
    const lawsuitCardItems = shuffle(getEnumValues(Lawsuit))
      .slice(0, 7)
      .map((it) => ({ id: it, location: { type: LocationType.LawsuitStack } }))
    this.material(MaterialType.LawsuitCard).createItems(lawsuitCardItems)
  }

  setupProducts() {
    products.forEach((product) => {
      this.material(MaterialType.Product).createItem({
        id: product,
        location: { type: LocationType.ProductSupply, id: product },
        quantity: 12
      })
    })
  }

  setupPlayers() {
    this.players.forEach((player, index) => {
      this.material(MaterialType.Factory).moveItem({ type: LocationType.PlayerFactories, player, rotation: false })
      this.material(MaterialType.Product)
        .id(Product.Beer)
        .moveItem({ type: LocationType.PlayerProducts, player, id: Product.Beer }, index + 1)
    })
  }

  start() {
    this.startPlayerTurn(RuleId.ChooseStartProduct, this.players[0])
  }
}
