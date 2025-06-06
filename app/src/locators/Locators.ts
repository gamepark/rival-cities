import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { City } from '@gamepark/rival-cities/City'
import { Locator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, Locator<City, MaterialType, LocationType>>> = {}
