/** @jsxImportSource @emotion/react */
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { InkJarPisteHelper } from '@gamepark/rival-cities/rules/helper/InkjarPisteHelper'
import { RuleId } from '@gamepark/rival-cities/rules/RuleId'
import { isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'

class InkSpaceLocator extends Locator {
  parentItemType = MaterialType.GameBoard
  coordinates = { z: 1 }

  getRotateZ(location: Location) {
    switch (location.id) {
      case 1:
        return 2.5
      case 2:
        return 1.5
      case 3:
        return 86
      case 4:
        return 95
      case 5:
        return 84
      case 6:
        return 86
      case 7:
        return 92
      case 8:
        return 180
      case 9:
        return 180
      case 10:
        return 178
      case 11:
        return 185
      case 12:
        return 177
      case 13:
        return 267
      case 14:
        return 268
      case 15:
        return 275
      case 16:
        return 267
      case 17:
        return 269
      case 18:
        return -2
      case 19:
        return 5
      default:
        return 0
    }
  }

  getPositionOnParent(location: Location) {
    switch (location.id) {
      case 0:
        return { x: 53.7, y: 3.2 }
      case 1:
        return { x: 71.8, y: 3.6 }
      case 2:
        return { x: 88, y: 3.6 }
      case 3:
        return { x: 96.5, y: 9.6 }
      case 4:
        return { x: 96.5, y: 32.7 }
      case 5:
        return { x: 96.3, y: 53.5 }
      case 6:
        return { x: 96.3, y: 68.6 }
      case 7:
        return { x: 96.6, y: 88.3 }
      case 8:
        return { x: 87.3, y: 96.5 }
      case 9:
        return { x: 66.5, y: 96.4 }
      case 10:
        return { x: 50, y: 96.5 }
      case 11:
        return { x: 27.1, y: 96.4 }
      case 12:
        return { x: 11.3, y: 96.3 }
      case 13:
        return { x: 3.5, y: 89.9 }
      case 14:
        return { x: 3.5, y: 69.3 }
      case 15:
        return { x: 3.5, y: 49.9 }
      case 16:
        return { x: 3.5, y: 29.1 }
      case 17:
        return { x: 3.5, y: 12 }
      case 18:
        return { x: 12.6, y: 3.5 }
      case 19:
        return { x: 30.5, y: 3.5 }
      default:
        return { x: 30, y: 3 }
    }
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    if (context.rules.game.rule?.player !== context.player) return []
    if (context.rules.game.rule?.id !== RuleId.AdvanceInkJar) return []
    return new InkJarPisteHelper(context.rules.game).possibleInkJarLocation()
  }

  locationDescription = new InkJarPisteDescription()
}

class InkJarPisteDescription extends DropAreaDescription {
  width = 2.5
  height = 1.75

  canShortClick(move: MaterialMove, location: Location): boolean {
    return isMoveItemType(MaterialType.InkJar)(move) && move.location.type === LocationType.InkSpace && move.location.id === location.id
  }
}

export const inkSpaceLocator = new InkSpaceLocator()
