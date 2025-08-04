import { City } from '@gamepark/rival-cities/City'
import { AllianceCard } from '@gamepark/rival-cities/material/AllianceCard'
import { LawsuitCard } from '@gamepark/rival-cities/material/LawsuitCard'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { shipCards } from '@gamepark/rival-cities/material/ShipCard'
import { RivalCitiesSetup } from '@gamepark/rival-cities/RivalCitiesSetup'

export const me = City.Altona
export const opponent = City.Hamburg

const allianceCardsToUse: AllianceCard[] = [
  AllianceCard.AllianceOslo,
  AllianceCard.AllianceLeHavre,
  AllianceCard.AllianceBruxelles,
  AllianceCard.AllianceKjjobenhavn
]

const lawsuitCardsToUse: LawsuitCard[] = [
  LawsuitCard.Lawsuit10,
  LawsuitCard.Lawsuit1,
  LawsuitCard.Lawsuit2,
  LawsuitCard.Lawsuit3,
  LawsuitCard.Lawsuit4,
  LawsuitCard.Lawsuit5,
  LawsuitCard.Lawsuit6
]

export class TutorialSetup extends RivalCitiesSetup {
  setupAllianceCards() {
    const allianceCardItems = allianceCardsToUse.slice(0, 4).map((it, index) => ({ id: it, location: { type: LocationType.AllianceCardsLayout, x: index } }))
    this.material(MaterialType.AllianceCard).createItems(allianceCardItems)
  }

  setupShipCards() {
    const shipCardsItems = shipCards.slice(0, 10).map((it) => ({ id: it, location: { type: LocationType.ShipCardsDeck } }))
    this.material(MaterialType.ShipCard).createItems(shipCardsItems)
    this.material(MaterialType.ShipCard).location(LocationType.ShipCardsDeck).limit(4).moveItems({
      type: LocationType.ShipCardsRiver
    })
  }

  setupLawsuitDeck() {
    const lawsuitCardItems = lawsuitCardsToUse.map((it) => ({ id: it, location: { type: LocationType.LawsuitDeck } }))
    this.material(MaterialType.LawsuitCard).createItems(lawsuitCardItems)
  }
}
