/** @jsxImportSource @emotion/react */
import React from 'react'
import { Trans } from 'react-i18next'

interface Props {
  player: string
  itsMe: boolean
}

export const BasicActionCard11Header: React.FC<Props> = ({ player, itsMe }) => {
  if (itsMe) {
    return (
      <Trans defaults="header.basic.action.card.11.you"/>
    )
  }

  return <Trans defaults="header.basic.action.card.11.player" values={{ player }} />
}
