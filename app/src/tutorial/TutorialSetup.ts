import { City } from '@gamepark/rival-cities/City'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { Lawsuit } from '@gamepark/rival-cities/material/Lawsuit'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Ship } from '@gamepark/rival-cities/material/Ship'
import { RivalCitiesSetup } from '@gamepark/rival-cities/RivalCitiesSetup'
import { getEnumValues } from '@gamepark/rules-api'

export const me = City.Altona
export const opponent = City.Hamburg

const allianceCardsToUse: Alliance[] = [Alliance.Oslo, Alliance.LeHavre, Alliance.Bruxelles, Alliance.Kjjobenhavn]

const lawsuitCardsToUse: Lawsuit[] = [
  Lawsuit.Lawsuit10,
  Lawsuit.Lawsuit1,
  Lawsuit.Lawsuit2,
  Lawsuit.Lawsuit3,
  Lawsuit.Lawsuit4,
  Lawsuit.Lawsuit5,
  Lawsuit.Lawsuit6
]

export class TutorialSetup extends RivalCitiesSetup {
  setupAllianceCards() {
    const allianceCardItems = allianceCardsToUse.slice(0, 4).map((it, index) => ({ id: it, location: { type: LocationType.AllianceSpace, x: index } }))
    this.material(MaterialType.AllianceCard).createItems(allianceCardItems)
  }

  setupShipCards() {
    const shipCardsItems = getEnumValues(Ship)
      .slice(0, 10)
      .map((it) => ({ id: it, location: { type: LocationType.ShipCardsDeck } }))
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
