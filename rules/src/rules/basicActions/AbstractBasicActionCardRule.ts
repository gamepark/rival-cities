import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'

export abstract class AbstractBasicActionCardRule extends MaterialRulesPart {
  player: number
  opponent: number
  constructor(game: MaterialGame) {
    super(game)
    this.player = this.game.rule?.player ?? 0
    this.opponent = this.game.players.find((p) => p !== this.player) ?? 0
  }

  onRuleStart(): MaterialMove[] {
    return []
  }
  onRuleEnd(): MaterialMove[] {
    return []
  }
  getPlayerMoves(): MaterialMove[] {
    return []
  }
}
