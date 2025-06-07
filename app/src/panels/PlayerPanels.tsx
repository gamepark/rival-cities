/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { City } from '@gamepark/rival-cities/City'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<City>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => (
        <StyledPlayerPanel key={player.id} color={player.id === 1 ? '#904639' : '#365164'} player={player} css={panelPosition(player.id)} activeRing />
      ))}
    </>,
    root
  )
}

const panelPosition = (player: number) => {
  if (player === 1) {
    return css`
      position: absolute;
      left: 1em;
      top: 8.5em;
      width: 28em;
    `
  }
  return css`
    position: absolute;
    right: 1em;
    top: 8.5em;
    width: 28em;
  `
}
