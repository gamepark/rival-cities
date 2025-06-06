import { MaterialGameSetup } from '@gamepark/rules-api'
import { RivalCitiesOptions } from './RivalCitiesOptions'
import { RivalCitiesRules } from './RivalCitiesRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class RivalCitiesSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, RivalCitiesOptions> {
  Rules = RivalCitiesRules

  setupMaterial(_options: RivalCitiesOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
