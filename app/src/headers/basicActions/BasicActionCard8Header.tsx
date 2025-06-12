/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
import { isCustomMoveType } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'

interface Props {
  player: string
  itsMe: boolean
}

export const BasicActionCard8Header: React.FC<Props> = ({ player, itsMe }) => {
  const rules = useRules<RivalCitiesRules>()!
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  const isDonationInProgress = rules.remind(MemoryType.IsDonationInProgress)
  if (itsMe) {
    if (isDonationInProgress) {
      return (
        <Trans
          defaults="header.basic.action.card.8.donation.in.progress.you"
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults="header.basic.action.card.8.you"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults="header.basic.action.card.8.player" values={{ player }} />
}
