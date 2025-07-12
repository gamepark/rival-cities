/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { AdvanceLawsuitAction } from '@gamepark/rival-cities/material/Actions/Actions'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const AdvanceLawsuitHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))

  const currentAction = rules.remind(MemoryType.Actions)[0] as AdvanceLawsuitAction

  if (itsMe) {
    if(currentAction?.nbTimeAlreadyAdvanced && currentAction.nbTimeAlreadyAdvanced > 0) {
      return (
        <Trans
          defaults={`header.advance.again.lawsuit.you`}
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults={`header.advance.lawsuit.you`}
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults={`header.advance.lawsuit.player`} values={{ player: name }} />
}
