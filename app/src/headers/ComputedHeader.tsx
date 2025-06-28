/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ComputedHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))

  const productChoosen = rules.remind(MemoryType.ProductChoosen)
  const isDonationInProgress = rules.remind(MemoryType.IsDonationInProgress)

  if (itsMe) {
    if (isDonationInProgress) {
      return (
        <Trans
          defaults="header.donation.in.progress.you"
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }

    if (productChoosen) {
      return (
        <Trans
          defaults="header.production.factory.you"
          values={{ product: productChoosen }}
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults={`header.computed.you`}
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults={`header.computed.player`} values={{ player: name }} />
}
