/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'

interface Props {
  player: string
  itsMe: boolean
}

export const BasicActionCard0Header: React.FC<Props> = ({ player, itsMe }) => {
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  if (itsMe) {
    return (
      <Trans
        defaults="header.basic.action.card.0.you"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults="header.basic.action.card.0.player" values={{ player }} />
}
