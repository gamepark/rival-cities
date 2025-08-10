/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { ChooseSplitActionRule } from '@gamepark/rival-cities/rules/actions/ChooseSplitActionRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { PerformMultipleActionsHeader } from './PerformMultipleActionsHeader'

export const ChooseSplitActionHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  if (new ChooseSplitActionRule(rules.game).hasAlliance(Alliance.Gdansk)) {
    return <PerformMultipleActionsHeader />
  }

  if (itsMe) {
    return (
      <Trans
        defaults={`header.choice.you`}
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults={`header.choice.player`} values={{ player: name }} />
}
