import { usePlayerName, useRankedPlayers, useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { EndOfGameHelper } from '@gamepark/rival-cities/rules/helper/EndOfGameHelper'
import { Trans } from 'react-i18next'

export const GameOverHeader = () => {
  const rules = useRules<RivalCitiesRules>()!
  const rankedPlayers = useRankedPlayers()
  const firstPlayer = rankedPlayers[0]
  const winnerName = usePlayerName(firstPlayer.id)
  const winWithShip = new EndOfGameHelper(rules.game).checkIfAPlayerAs3MoreShips()
  const winWithLawsuit = new EndOfGameHelper(rules.game).checkIfAPlayerhasWin3Lawsuits()
  const winWithAlliances = new EndOfGameHelper(rules.game).checkIfAPlayerhasThe4Alliances()
  const winWithPrestige = new EndOfGameHelper(rules.game).checkIfPrestigeMarkerIsOnACity()

  if (winWithShip) {
    return <Trans i18nKey="header.end.ship.player" values={{ player: winnerName }} />
  }

  if (winWithLawsuit) {
    return <Trans i18nKey="header.end.lawsuit.player" values={{ player: winnerName }} />
  }

  if (winWithAlliances) {
    return <Trans i18nKey="header.end.alliances.player" values={{ player: winnerName }} />
  }

  if (winWithPrestige) {
    return <Trans i18nKey="header.end.prestige.player" values={{ player: winnerName }} />
  }

  const winnerScore = new EndOfGameHelper(rules.game).getScore(firstPlayer.id as number)
  const loserScore = new EndOfGameHelper(rules.game).getScore(rankedPlayers[1].id as number)

  if (winnerScore > loserScore) {
    return <Trans i18nKey="header.end.score.player" values={{ player: winnerName, winnerScore, loserScore }} />
  }

  const playerWithBell = rules.material(MaterialType.BellToken).location(LocationType.PlayerBellToken).getItem()?.location.player

  if (playerWithBell) {
    return <Trans i18nKey="header.end.bell.player" values={{ playerWithBell }} />
  }

  return <Trans i18nKey="result.comp.tie.all" />
}
